/**
 * Original work Copyright (c) 2022 Signum Network
 */

/**
 * Wallet Connection object returned from [[GenericWalletExtension.connect]]
 * You can use this information for preparing transactions and send them back to the wallet
 * for confirmation with [[GenericWalletExtension.confirm]]
 * @module wallets
 */
export interface WalletConnection {
    /**
     * The connected account
     */
    accountId: string;
    /**
     * The currently chosen network for that account in the wallet
     */
    nodeHost: string;
    /**
     * The accounts public key
     */
    publicKey: string;
}
