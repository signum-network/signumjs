/**
 Original work Copyright (c) 2022 Signum Network
 */
import {Amount} from './amount';

export function convertPlanckToAssetPrice(planck: string, decimals: number): string {
    return Amount.fromSigna(planck).divide(10 ** decimals).getSigna();
}
