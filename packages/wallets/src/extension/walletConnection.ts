/**
 * Original work Copyright (c) 2022 Signum Network
 */

import {ExtensionAdapter} from './extensionAdapter';
import {ExtensionListener} from './extensionListener';

export type ConnectionStatus = 'connected' | 'disconnected';

/**
 * Wallet Connection object returned from [[GenericExtensionWallet.connect]]
 * You can use this information for preparing transactions and send them back to the wallet
 * for confirmation with [[GenericExtensionWallet.confirm]]
 * @module wallets
 */
export class WalletConnection {
    private _status: ConnectionStatus;
    private availabilityListener: ExtensionListener;

    /**
     * @param accountId The connected account
     * @param publicKey The accounts public key
     * @param nodeHost The currently chosen host for that account in the wallet
     * @param adapter the extension adapter with its internal implementation
     */
    constructor(
        public readonly accountId: string,
        public readonly publicKey: string,
        public readonly nodeHost: string,
        private adapter: ExtensionAdapter,
    ) {
        this._status = 'connected';
    }

    get connectionStatus(): ConnectionStatus {
        return this._status;
    }

    /**
     * Listens to changes in the wallet
     *
     * Only one listener instance is allowed, previous listener will be removed/overwritten
     *
     * @param callback
     * @return The listener instance, needed to unlisten
     */
    listen(callback: (connection: WalletConnection) => void): ExtensionListener {
        if (this.availabilityListener) {
            this.availabilityListener.unlisten();
        }
        this.availabilityListener = this.adapter.onAvailabilityChange((available) => {
            const newStatus = available ? 'connected' : 'disconnected';
            if (newStatus !== this._status) {
                this._status = newStatus;
                callback(this);
            }
        });

        // TODO: add permission listener
        return {
            unlisten: () => {
                this.availabilityListener.unlisten();

            }
        };
    }
}
