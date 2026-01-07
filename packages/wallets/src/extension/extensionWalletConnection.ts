/**
 * Original work Copyright (c) 2022 Signum Network
 */

import {ExtensionAdapter} from './extensionAdapter';
import {ExtensionListener} from './extensionListener';
import {
    ExtensionNotification,
    ExtensionNotificationType
} from './messaging';
import {ExtensionNotificationHandler} from './extensionNotificationHandler';


/**
 * Wallet Connection object returned from {@link ExtensionWallet.connect}
 * You can use this to listen to events in the wallet, i.e. network changes, or permission removals
 * @module wallets
 */
export class ExtensionWalletConnection {
    private notificationListener: ExtensionListener;

    /**
     * @param accountId The connected account
     * @param publicKey The accounts public key
     * @param watchOnly Indicates whether this account is watch only, or not. Watch Only accounts cannot sign messages.
     * @param availableNodeHosts The available nodeHosts for given network, which are registered in the wallet.
     * @param currentNodeHost The currently selected nodeHost in the wallet
     * @param adapter the extension adapter with its internal implementation
     */
    constructor(
        public accountId: string,
        public publicKey: string,
        public watchOnly: boolean,
        public availableNodeHosts: string[],
        public currentNodeHost: string,
        private readonly adapter: ExtensionAdapter,
    ) {
    }

    /**
     * Listens to changes in the wallet
     *
     * Only one listener instance is allowed, previous listener will be removed/overwritten
     *
     * @param notificationHandler The object with the event handler
     * @return The listener instance, needed to unlisten
     */
    listen(notificationHandler: ExtensionNotificationHandler): ExtensionListener {
        this.notificationListener = this.adapter.onNotification((msg: ExtensionNotification) => {
            const {onPermissionRemoved, onNetworkChanged, onAccountRemoved, onAccountChanged} = notificationHandler;
            const call = (fn, args = undefined) => fn && fn(args);
            switch (msg.type) {
                case ExtensionNotificationType.NetworkChanged:
                    if (this.currentNodeHost !== msg.networkHost) {
                        this.currentNodeHost = msg.networkHost;
                        call(onNetworkChanged, {
                            networkName: msg.networkName,
                            networkHost: msg.networkHost,
                        });
                    }
                    break;
                case ExtensionNotificationType.AccountChanged: {
                    if (this.accountId !== msg.accountId) {
                        this.accountId = msg.accountId;
                        this.publicKey = msg.accountPublicKey;
                        this.watchOnly = msg.watchOnly;
                        call(onAccountChanged, {accountId: msg.accountId, accountPublicKey: msg.accountPublicKey, watchOnly: msg.watchOnly});
                    }
                    break;
                }
                case ExtensionNotificationType.PermissionRemoved: {
                    if (window.location.origin === msg.url) {
                        this.accountId = '';
                        this.publicKey = '';
                        this.availableNodeHosts = [];
                        this.currentNodeHost = '';
                        this.watchOnly = false;
                        call(onPermissionRemoved, {url: msg.url});
                    }
                    break;
                }
                case ExtensionNotificationType.AccountRemoved: {
                    if (this.accountId === msg.accountId) {
                        this.accountId = '';
                        this.publicKey = '';
                        this.watchOnly = false;
                        call(onAccountRemoved, {accountId: msg.accountId});
                    }
                    break;
                }
            }

        });

        return this.notificationListener;
    }
}
