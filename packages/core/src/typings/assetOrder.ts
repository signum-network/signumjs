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
    /**
     * The price in planck per one token quantity. To get the right Planck expression use either price field or this formula: (priceNQT * 10^8) * 10^(decimals-8)
     *
     * @see [[util.convertAssetPriceToPlanck]]
     *
     */
    priceNQT: string;
    /**
     * The price per integral token, i.e. if a token has 2 (two) decimals, then this amount is per 100 QNT (Quantity). The amount is always returned in Planck, that is Signa multiplied by 10E8
     */
    price: string;
    order: string;
    type: 'ask' | 'bid';
    asset: string;
    quantityQNT: string;
    height: number;
}
