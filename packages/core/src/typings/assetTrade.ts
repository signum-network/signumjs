/**
 * Original work Copyright (c) 2022 Signum Network
 */

/**
 * Asset Trade
 *
 * @category entities
 */
export interface AssetTrade {
    /**
     * The price in planck per one token quantity. To get the right Planck expression use either price field or this formula: (priceNQT * 10^8) * 10^(decimals-8)
     * @see {@link util:convertAssetPriceToPlanck}
     */
    priceNQT: string;
    /**
     * The price per integral token, i.e. if a token has 2 (two) decimals, then this amount is per 100 QNT (Quantity). The amount is always returned in Planck, that is Signa multiplied by 10E8
     */
    price: string;
    askOrder: string;
    bidOrder: string;
    askOrderHeight: number;
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
