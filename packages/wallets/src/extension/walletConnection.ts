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
 * Wallet Connection object returned from [[GenericExtensionWallet.connect]]
 * You can use this to listen to events in the wallet, i.e. network changes, or permission removals
 * @module wallets
 */
export class WalletConnection {
    private notificationListener: ExtensionListener;

    /**
     * @param accountId The connected account
     * @param publicKey The accounts public key
     * @param availableNodeHosts The available nodeHosts for given network, which are registered in the wallet.
     * @param currentNodeHost The currently selected nodeHost in the wallet
     * @param adapter the extension adapter with its internal implementation
     */
    constructor(
        public readonly accountId: string,
        public readonly publicKey: string,
        public readonly availableNodeHosts: string[],
        public readonly currentNodeHost: string,
        private adapter: ExtensionAdapter,
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
        this.notificationListener = this.adapter.onNotification( (msg: ExtensionNotification) => {
            const  {onPermissionRemoved, onNetworkChange, onAccountRemoved } = notificationHandler;
            const call = (fn, args = undefined) => fn && fn(args);
            switch (msg.type) {
                case ExtensionNotificationType.NetworkChanged:
                    call(onNetworkChange, {
                        networkName: msg.networkName,
                        networkHost: msg.networkHost
                    });
                    break;
                case ExtensionNotificationType.PermissionRemoved: {
                    if (window.location.origin === msg.url) {
                        call(onPermissionRemoved, {url: msg.url});
                    }
                    break;
                }
                case ExtensionNotificationType.AccountRemoved: {
                    if (this.accountId === msg.accountId) {
                        call(onAccountRemoved, {accountId: msg.accountId});
                    }
                    break;
                }
            }

        });

        return this.notificationListener;
    }
}
