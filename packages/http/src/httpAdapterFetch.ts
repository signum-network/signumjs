import {HttpResponse} from './httpResponse';
import {HttpError} from './httpError';
import {Http} from './http';
import {HttpClientOptions} from './httpClientOptions';

const defaultValidateStatus = (status: number) => status >= 200 && status < 300;

/**
 * Http implementation of {@link Http} using the platform's native `fetch`.
 *
 * Works in browsers, Node.js >= 18, Deno, Bun and Cloudflare Workers without
 * any external dependency.
 *
 * Prefer {@link HttpClientFactory.createHttpClient} to create an instance.
 *
 * @module http
 */
export class HttpAdapterFetch implements Http {

    private readonly _baseURL: string;
    private readonly _defaults: HttpClientOptions;

    constructor(baseURL: string, options: HttpClientOptions = {}) {
        this._baseURL = baseURL.replace(/\/+$/, '');
        this._defaults = options;
    }

    async get(url: string, options?: HttpClientOptions): Promise<HttpResponse> {
        return this.request('GET', url, undefined, options);
    }

    async post(url: string, payload: any, options?: HttpClientOptions): Promise<HttpResponse> {
        return this.request('POST', url, payload, options);
    }

    async put(url: string, payload: any, options?: HttpClientOptions): Promise<HttpResponse> {
        return this.request('PUT', url, payload, options);
    }

    async delete(url: string, options?: HttpClientOptions): Promise<HttpResponse> {
        return this.request('DELETE', url, undefined, options);
    }

    private buildUrl(url: string): string {
        if (/^https?:\/\//i.test(url)) {
            return url;
        }
        if (!this._baseURL) {
            return url;
        }
        return url.startsWith('/') ? `${this._baseURL}${url}` : `${this._baseURL}/${url}`;
    }

    private resolveOptions(perCall?: HttpClientOptions): Required<Pick<HttpClientOptions, 'validateStatus'>> & HttpClientOptions {
        const merged: HttpClientOptions = {
            ...this._defaults,
            ...perCall,
            headers: {
                ...(this._defaults.headers || {}),
                ...(perCall?.headers || {})
            },
            fetchOptions: {
                ...(this._defaults.fetchOptions || {}),
                ...(perCall?.fetchOptions || {})
            }
        };
        return {
            ...merged,
            validateStatus: merged.validateStatus || defaultValidateStatus
        };
    }

    private async request(method: string, url: string, payload: any, perCall?: HttpClientOptions): Promise<HttpResponse> {
        const opts = this.resolveOptions(perCall);
        const fullUrl = this.buildUrl(url);

        const headers: Record<string, string> = {
            Accept: 'application/json',
            ...(opts.headers || {})
        };

        let body: BodyInit | undefined;
        if (payload !== undefined && payload !== null) {
            if (typeof payload === 'string' || payload instanceof ArrayBuffer || payload instanceof Uint8Array) {
                body = payload as BodyInit;
            } else if (typeof FormData !== 'undefined' && payload instanceof FormData) {
                body = payload;
            } else {
                body = JSON.stringify(payload);
                if (!headers['Content-Type'] && !headers['content-type']) {
                    headers['Content-Type'] = 'application/json';
                }
            }
        }

        const init: RequestInit = {
            ...(opts.fetchOptions || {}),
            method,
            headers,
            body
        };

        if (opts.timeout && opts.timeout > 0) {
            init.signal = AbortSignal.timeout(opts.timeout);
        }

        let response: Response;
        try {
            response = await fetch(fullUrl, init);
        } catch (error: any) {
            if (error?.name === 'TimeoutError' || error?.name === 'AbortError') {
                throw new HttpError(url, 0, 'Request timed out', error?.message || null);
            }
            throw new HttpError(url, 0, 'Request failed', error?.message || String(error));
        }

        const data = await this.parseBody(response);

        if (!opts.validateStatus(response.status)) {
            throw new HttpError(url, response.status, response.statusText || 'Request failed', data);
        }

        return new HttpResponse(response.status, data);
    }

    // eslint-disable-next-line class-methods-use-this
    private async parseBody(response: Response): Promise<any> {
        if (response.status === 204 || response.status === 205) {
            return null;
        }
        const contentType = response.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
            const text = await response.text();
            return text ? JSON.parse(text) : null;
        }
        // Fall back to text; callers that need blobs/streams can use fetchOptions
        return response.text();
    }
}

