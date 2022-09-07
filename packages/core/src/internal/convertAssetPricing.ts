/** @ignore */
/** @internal */

import {Amount} from '@signumjs/util';

export function convertAssetPriceToPlanck(assetPrice: string, decimals: number): string {
    // I'm "abusing" the Amount with its bignumber calculations here...Signa allows 8 decimals...
    return Amount.fromSigna(assetPrice).multiply(10 ** (decimals - 8)).getPlanck();
}

export function convertPlanckToAssetPrice(planck: string, decimals: number): string {
    return Amount.fromSigna(planck).divide(10 ** decimals).getSigna();
}
