/**
 Original work Copyright (c) 2022 Signum Network
 */
import {Amount} from './amount';

/**
 * Converts planck into a `priceNQT` used by Node method `placeOrder`.
 *
 * Usually, you don't need this. {@link AssetApi.placeAskOrder} and {@link AssetApi.placeBidOrder} convert planck into
 * correct value already. This helper is just for those who interact with the Node Http API directly
 *
 * @see {@link util.convertAssetPriceToPlanck}
 *
 * @param planck the amount in planck per token
 * @param decimals the number of decimals for targeted asset
 * @return the Price in _planck per one token quantity_
 * @module util
 */
export function convertPlanckToAssetPrice(planck: string, decimals: number): string {
    return Amount.fromSigna(planck).divide(10 ** decimals).getSigna();
}
