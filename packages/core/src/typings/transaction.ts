/**
 * Original work Copyright (c) 2019 Burst Apps Team
 * Modified work Copyright (c) 2022 Signum Network
 */

/**
 * The mighty transaction
 *
 * @module core
 * */
export interface Transaction {
    readonly amountNQT: string;
    readonly attachment?: any;
    readonly block: string;
    readonly blockTimestamp: number;
    readonly cashbackId: string;
    readonly confirmations?: number;
    readonly deadline: number;
    readonly ecBlockHeight: number;
    readonly ecBlockId: string;
    readonly feeNQT: string;
    readonly fullHash: string;
    readonly height: number;
    readonly recipient?: string;
    readonly recipientRS?: string;
    readonly referencedTransactionFullHash?: string;
    readonly requestProcessingTime: number;
    readonly sender: string;
    readonly senderPublicKey: string;
    readonly senderRS: string;
    readonly signature: string;
    readonly signatureHash: string;
    readonly subtype: number;
    readonly timestamp: number;
    readonly transaction: string;
    readonly type: number;
    readonly version: number;
}

