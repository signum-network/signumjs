/**
 * Original work Copyright (c) 2019 Burst Apps Team
 * Modified work Copyright (c) 2022 Signum Network
 */

import {DistributionAmount} from './distributionAmount';

/**
 * The mighty transaction
 *
 * @module core
 * */
export interface Transaction {
    amountNQT: string;
    attachment?: any;
    block: string;
    blockTimestamp: number;
    cashBackId: string;
    confirmations?: number;
    deadline: number;
    ecBlockHeight: number;
    ecBlockId: string;
    feeNQT: string;
    fullHash: string;
    height: number;
    recipient?: string;
    recipientRS?: string;
    referencedTransactionFullHash?: string;
    requestProcessingTime: number;
    sender: string;
    senderPublicKey: string;
    senderRS: string;
    signature: string;
    signatureHash: string;
    subtype: number;
    timestamp: number;
    transaction: string;
    type: number;
    version: number;
    distribution?: {assetId: string, distributedAssetId?: string} & DistributionAmount;
}

