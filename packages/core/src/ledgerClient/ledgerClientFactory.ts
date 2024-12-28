import {Api} from '../typings/api';
import {composeApi} from '../api';
import {Http} from '@signumjs/http';
/**
 * Alias for {@link Api}
 */
export declare type Ledger = Api;


/**
 * The LedgerSettings to use for {@link LedgerClientFactory}
 */
export interface LedgerSettings {
    /**
     * Url to the API endpoint of the node, i.e. https://brazil.signum.network or http://localhost:8125
     */
    nodeHost: string;
    /**
     * A list of node Urls, which can be considered reliable. If you set this list, those nodes are used as automatic fallback in case of
     * request issues.
     */
    reliableNodeHosts?: string[];
    /**
     * A custom http client implementation. Default is based on axios
     */
    httpClient?: Http;
    /**
     * Additional global options for the http client. Default client is axios, see its options here:
     * see [Axios Configuration](https://github.com/axios/axios#request-config)
     */
    httpOptions?: any;
}

/**
 * Factory for the ledger clients to access a nodes API
 * ```ts
 *  const signumClient = LedgerClientFactory.createClient({nodeHost: "https://europe.signum.network"});
 * ```
 *
 * The client gives you access to the Signum {@link Api}
 *
 */
export class LedgerClientFactory {
    /**
     * Creates a ledger client instance
     *
     * @param settings The settings for the ledger
     */
    static createClient(settings: LedgerSettings): Ledger {
        return composeApi(settings);
    }
}
