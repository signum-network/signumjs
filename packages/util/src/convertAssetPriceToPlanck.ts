/**
 Original work Copyright (c) 2022 Signum Network
 */
import {Amount} from './amount';

/**
 * Converts an Asset Price (priceNQT) into Planck returned in Trade and/or Order objects from node
 * @param assetPrice The priceNQT from asset queries
 * @param decimals The decimals of that asset
 * @module util
 */
export function convertAssetPriceToPlanck(assetPrice: string, decimals: number): string {
    // I'm "abusing" the Amount with its bignumber calculations here...Signa allows 8 decimals...
    return Amount.fromSigna(assetPrice).multiply(10 ** (decimals - 8)).getPlanck();
}
