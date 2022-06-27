/**
 * Original work Copyright (c) 2019 Burst Apps Team
 * Modified work Copyright (c) 2022 Signum Network
 */

import {Transaction} from './transaction';

/**
 *
 * TransactionId
 *
 * This object is being returned by a signed and broadcasted transaction, i.e. when passed a private key to
 * transactional methods.
 *
 * @module core
 * */
export interface TransactionId {
    readonly fullHash: string;
    readonly transaction: string;
    readonly numberOfPeersSentTo: number;
    readonly requestProcessingTime: number;
    readonly transactionBytes: string;
    readonly unsignedTransactionBytes: string;
    readonly signatureHash: string;
    readonly broadcasted: boolean;
    readonly transactionJSON: Transaction;
}
