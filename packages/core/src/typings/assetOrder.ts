/**
 * Original work Copyright (c) 2022 Signum Network
 */

/**
 * Asset Order
 * @module core
 */
export interface AssetOrder {
    account: string;
    accountRS: string;
    priceNQT: string;
    order: string;
    type: 'ask' | 'bid';
    asset: string;
    quantityQNT: string;
    height: number;
}
