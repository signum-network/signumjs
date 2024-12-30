/**
 * Copyright (c) 2019 Burst Apps Team
 * Modified (c) 2023 Signum Network
 */

import {Http, HttpError, HttpClientFactory, HttpResponse} from '@signumjs/http';
import {asyncRetry} from '@signumjs/util';
import {ChainServiceSettings} from './chainServiceSettings';
import {DefaultApiEndpoint} from '../constants';
import {verifyTransaction} from '../internal/verifyTransaction';

/**
 * The send arguments for {@link ChainService.send}
 *
 * @category args
 */
export interface SendArgs {

    /**
     * Setting this option to `true`, skips the additional security check, i.e. the verification of the
     * unsigned transaction bytes, which detects tampered node responses. By default, the option is `false`.
     * Usually, you won't use this option, but can be useful when a method cannot be verified,
     * because the verification is not implemented yet.
     *
     */
    skipAdditionalSecurityCheck?: boolean;

    [key: string]: any;
}

// Old API is inconsistent in its error responses
interface ApiError {
    readonly errorCode?: number;
    readonly errorDescription?: string;
    readonly error?: string;
}

class SettingsImpl implements ChainServiceSettings {
    constructor(settings: ChainServiceSettings) {
        this.apiRootUrl = settings.apiRootUrl || DefaultApiEndpoint;
        this.nodeHost = settings.nodeHost;
        this.httpClient = settings.httpClient || HttpClientFactory.createHttpClient(settings.nodeHost, settings.httpClientOptions);
        this.reliableNodeHosts = settings.reliableNodeHosts || [];
    }

    readonly apiRootUrl: string;
    readonly httpClient: Http;
    readonly nodeHost: string;
    readonly reliableNodeHosts: string[];
}


interface HostSelectionOptions {
    reconfigure?: boolean;
    checkMethod?: string;
    timeout?: number;
}

/**
 * Generic Chain Service class.
 *
 * This class can be used to call the chain api directly, in case a function is
 * not supported yet by SignumJS. Usually, you won't need to do it.
 *
 *
 *
 *
 */
export class ChainService {
    /**
     * Creates Service instance
     * @param settings The settings for the service
     */
    constructor(settings: ChainServiceSettings) {

        this.settings = new SettingsImpl(settings);
        const {apiRootUrl} = this.settings;
        if (apiRootUrl) {
            this._relPath = apiRootUrl.endsWith('/') ? apiRootUrl.substr(0, apiRootUrl.length - 1) : apiRootUrl;
        }
    }

    public settings: ChainServiceSettings;
    private readonly _relPath: string = DefaultApiEndpoint;

    private static throwAsHttpError(url: string, apiError: ApiError): void {
        const errorCode = apiError.errorCode && ` (Code: ${apiError.errorCode})` || '';
        throw new HttpError(url,
            400,
            `${apiError.errorDescription || apiError.error}${errorCode}`,
            apiError);
    }


    /**
     * Mounts an API conformant endpoint of format `<host>?requestType=getBlock&height=123`
     *
     * @see https://docs.signum.network/signum/node-http-api
     *
     * @param {string} method The method name for `requestType`
     * @param {any} data A JSON object which will be mapped to url params
     * @return {string} The mounted url (without host)
     */
    public toApiEndpoint(method: string, data: object = {}): string {
        const request = `${this._relPath}?requestType=${method}`;
        const params = Object.keys(data)
            .filter(k => data[k] !== undefined && k !== 'skipAdditionalSecurityCheck')
            .map(k => `${k}=${encodeURIComponent(data[k])}`)
            .join('&');
        return params ? `${request}&${params}` : request;
    }


    /**
     * Requests a query to the configured chain node
     * @param {string} method The method according https://europe.signum.network/api-doc/
     * @param {any} args A JSON object which will be mapped to url params
     * @param {any} options The optional request configuration for the passed Http client
     * (default is [AxiosRequestConfig](https://axios-http.com/docs/req_config) )
     * @return {Promise<T>} The response data of success
     * @throws HttpError in case of failure
     */
    public async query<T>(method: string, args: any = {}, options?: any): Promise<T> {
        const endpoint = this.toApiEndpoint(method, args);

        const {response} = await this.faultTolerantRequest(() => this.settings.httpClient.get(endpoint, options));

        if (response.errorCode || response.error || response.errorDescription) {
            ChainService.throwAsHttpError(endpoint, response);
        }
        return response;

    }

    /**
     * Send data to chain node
     * @param {string} method The method according https://europe.signum.network/api-doc/.
     *        Note that there are only a few POST methods
     * @param {SendArgs} args A JSON object which will be mapped to url params
     * @param {any} body An object with key value pairs to submit as post body
     * @param  {any} options The optional request configuration for the passed Http client
     * (default is [AxiosRequestConfig](https://axios-http.com/docs/req_config) )
     * @return {Promise<T>} The response data of success
     * @throws HttpError in case of failure
     */
    public async send<T>(method: string, args: SendArgs = {}, body?: object, options?: any): Promise<T> {
        const endpoint = this.toApiEndpoint(method, args);

        const {response} = await this.faultTolerantRequest(() => this.settings.httpClient.post(endpoint, body, options));

        if (response.errorCode || response.error || response.errorDescription) {
            ChainService.throwAsHttpError(endpoint, response);
        }


        if (!args.skipAdditionalSecurityCheck) {
            verifyTransaction(method, args, response);
        }

        return response;
    }

    private async faultTolerantRequest(requestFn: () => Promise<HttpResponse>): Promise<HttpResponse> {
        const onFailureAsync = async (e, retrialCount): Promise<boolean> => {
            const shouldRetry = this.settings.reliableNodeHosts.length && retrialCount < this.settings.reliableNodeHosts.length;
            if (shouldRetry) {
                await this.selectBestHost(true);
            }
            return shouldRetry;
        };

        return asyncRetry({
            asyncFn: requestFn,
            onFailureAsync
        });
    }

    /**
     * Selects the fastest responding host from the configured reliable node hosts.
     * @param reconfigure An optional flag to set automatic reconfiguration. Default is `false`
     * Attention: Reconfiguration works only, if you use the default http client. Otherwise, you need to reconfigure manually!
     * @param checkMethod The optional API method to be called. This applies only for GET methods. Default is `getBlockchainStatus`
     * @param timeout The optional amount of time in milliseconds to check. Default is 10_000
     * @returns Promise resolving to the selected host
     * @throws Error if no reliable hosts are configured or if all hosts fail
     */
    public async selectBestHost(
                                      reconfigure = false,
                                      timeout = 10_000,
                                      checkMethod = 'getBlockchainStatus'
                                  ): Promise<string> {
        const {reliableNodeHosts} = this.settings;

        if (!reliableNodeHosts.length) {
            throw new Error('No reliable node hosts configured');
        }

        const checkEndpoint = this.toApiEndpoint(checkMethod);

        // Create a function to check a single host with timeout
        const checkHost = async (host: string): Promise<{ host: string; responseTime: number }> => {
            const start = Date.now();
            const absoluteUrl = `${host}${checkEndpoint}`;

            try {
                await Promise.race([
                    this.settings.httpClient.get(absoluteUrl),
                    new Promise((_, reject) =>
                        setTimeout(() => reject(new Error('Timeout')), timeout)
                    )
                ]);

                return {
                    host,
                    responseTime: Date.now() - start
                };
            } catch (error) {
                throw error;
            }
        };

        try {
            // Check all hosts concurrently and get the fastest responding one
            const results = await Promise.allSettled(
                reliableNodeHosts.map(host => checkHost(host))
            );

            const successfulHosts = results
                .filter((result): result is PromiseFulfilledResult<{ host: string; responseTime: number }> =>
                    result.status === 'fulfilled'
                )
                .map(result => result.value)
                .sort((a, b) => a.responseTime - b.responseTime);

            if (!successfulHosts.length) {
                throw new Error('All reliable node hosts failed to respond');
            }

            const bestHost = successfulHosts[0].host;

            if (reconfigure) {
                this.settings = new SettingsImpl({
                    ...this.settings,
                    httpClient: HttpClientFactory.createHttpClient(bestHost, this.settings.httpClientOptions),
                    nodeHost: bestHost,
                });
            }

            return bestHost;

        } catch (error: any) {
            throw new Error(`Failed to select best host: ${error.message}`);
        }
    }
}
