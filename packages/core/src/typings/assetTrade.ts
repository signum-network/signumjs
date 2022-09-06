/**
 * Original work Copyright (c) 2022 Signum Network
 */

/**
 * Asset Trade
 * @module core
 */
export interface AssetTrade {
    priceNQT: string;
    askOrder: string;
    bidOrder: string;
    askOrderHeight: 440941;
    seller: string;
    sellerRS: string;
    buyer: string;
    buyerRS: string;
    block: string;
    tradeType: 'buy' | 'sell';
    asset: string;
    quantityQNT: string;
    height: number;
    timestamp: number;
    name: string;
    decimals: number;
}
