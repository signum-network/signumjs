/**
 * Original work Copyright (c) 2023 Signum Network
 */
import {Amount} from '@signumjs/util';

/**
 * Distribution Fee
 * See {@link calculateDistributionFee}
 * @category entities
 */
export interface DistributionFee {
    fee: Amount;
    numberOfAccounts: number;
}
