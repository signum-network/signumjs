/**
 * Original work Copyright (c) 2023 Signum Network
 */
import {Amount} from '@signumjs/util';

/**
 * Distribution Fee
 * See [assetApi.calculateDistributionFee]
 * @module core
 */
export interface DistributionFee {
    fee: Amount;
    numberOfAccounts: number;
}
