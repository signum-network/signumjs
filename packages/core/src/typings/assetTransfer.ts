/**
 * Original work Copyright (c) 2022 Signum Network
 */

/**
 * Asset Transfer
 ** @module core
 */
export interface AssetTransfer {
    assetTransfer: string;
    asset: string;
    sender: string;
    senderRS: string;
    recipient: string;
    recipientRS: string;
    quantityQNT: string;
    height: number;
    timestamp: number;
    name?: string;
    decimals?: number;
}
