import {Api} from '../typings/api';
import {composeApi} from '../api';

/**
 * Alias for [[Api]]
 */
export declare type Ledger = Api;


/**
 * The LedgerSettings to use for [[LedgerClientFactory]]
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
}

/**
 * Factory for the ledger clients to access a nodes API
 *
 * At the current state it's merely an alias for [[composeApi]]
 *
 * @module core
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
