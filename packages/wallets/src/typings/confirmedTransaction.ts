/**
 * Original work Copyright (c) 2022 Signum Network
 */

/**
 * Object returned from {@link GenericExtensionWallet.confirm}
 * @module wallets
 */
export interface ConfirmedTransaction {
    /**
     * The transaction id
     */
    transactionId: string;
    /**
     * The hash of the transaction
     */
    fullHash: string;
}
