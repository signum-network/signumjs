/**
 * The notification handler for events in the extension wallet
 * @module wallets
 */
export interface ExtensionNotificationHandler {
    /**
     * Called when network changes
     */
    onNetworkChanged?: (args: {networkName: string, networkHost: string}) => void;
    /**
     * Called when account changes
     */
    onAccountChanged?: (args: {accountId: string, accountPublicKey: string}) => void;
    /**
     * Called when the permission for the currently connected application was removed
     */
    onPermissionRemoved?: (args: {origin: string}) => void;
    /**
     * Called when the account for the currently connected application was removed
     */
    onAccountRemoved?: (args: {accountId: string}) => void;
}
