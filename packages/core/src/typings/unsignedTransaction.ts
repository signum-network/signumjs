
/**
 * Original work Copyright (c) 2019 Burst Apps Team
 * Modified work Copyright (c) 2022 Signum Network
 */

/**
 * Unsigned Transaction
 *
 * This is being returned from transaction methods, if no private key was given
 *
 * @module core
 * */
export interface UnsignedTransaction {
    readonly signatureHash: string;
    readonly unsignedTransactionBytes: string;
    readonly transactionJSON: object;
    readonly broadcasted: boolean;
    readonly requestProcessingTime: number;
}


