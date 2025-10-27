import {Api} from '../typings/api';
import {composeApi} from '../api';
import {Http} from '@signumjs/http';
import {createReadOnlyClient as _createReadOnlyClient} from './createReadOnlyClient';
import {createClient as _createClient} from './createClient';
import {createClientWithEncryptedMessaging as _createClientWithEncryptedMessaging} from './createClientWithEncryptedMessaging';
import {ReadOnlyLedger, StandardLedger, FullLedger} from '../typings/ledgerClientTypes';

/**
 * Alias for {@link Api}
 * @deprecated Use specific client types instead: {@link ReadOnlyLedger}, {@link StandardLedger}, or {@link FullLedger}
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
 *
 * @deprecated Use the tree-shakeable factory functions instead:
 * - {@link createReadOnlyClient} for read-only operations (minimal bundle)
 * - {@link createClient} for standard operations without encrypted messaging (recommended default)
 * - {@link createClientWithEncryptedMessaging} for full API including encrypted messaging
 *
 * @example
 * ```typescript
 * // Old way (deprecated - bundles everything)
 * import {LedgerClientFactory} from '@signumjs/core';
 * const ledger = LedgerClientFactory.createClient({nodeHost: "https://europe.signum.network"});
 *
 * // New way (tree-shakeable)
 * import {createClient} from '@signumjs/core/createClient';
 * const ledger = createClient({nodeHost: "https://europe.signum.network"});
 * ```
 */
export class LedgerClientFactory {
    /**
     * Creates a full ledger client instance with all APIs including encrypted messaging
     *
     * @deprecated Use {@link createClientWithEncryptedMessaging} instead for better tree-shaking
     * @param settings The settings for the ledger
     */
    static createClient(settings: LedgerSettings): Ledger {
        return composeApi(settings);
    }

    /**
     * Creates a read-only ledger client (no crypto dependencies)
     *
     * Bundle size: Minimal (~5-10 KB)
     * Use for: Dashboards, explorers, monitoring
     *
     * @param settings The settings for the ledger
     * @returns A read-only ledger client
     */
    static createReadOnlyClient(settings: LedgerSettings): ReadOnlyLedger {
        return _createReadOnlyClient(settings);
    }

    /**
     * Creates a standard ledger client without encrypted messaging (recommended default)
     *
     * Bundle size: ~40-50 KB (includes crypto/sign, no Pako)
     * Use for: Most applications - wallets, payments, asset trading
     *
     * @param settings The settings for the ledger
     * @returns A standard ledger client
     */
    static createStandardClient(settings: LedgerSettings): StandardLedger {
        return _createClient(settings);
    }

    /**
     * Creates a full ledger client with encrypted messaging support
     *
     * Bundle size: ~170-180 KB (includes Pako compression)
     * Use for: Messaging applications only
     *
     * @param settings The settings for the ledger
     * @returns A full ledger client with encrypted messaging
     */
    static createClientWithEncryptedMessaging(settings: LedgerSettings): FullLedger {
        return _createClientWithEncryptedMessaging(settings);
    }
}
