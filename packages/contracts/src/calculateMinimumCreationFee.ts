/**
 * Original Work Copyright (c) 2019 Burst Apps Team
 * Modified Work Copyright (c) 2021 Signum Network
 */

import {Amount, FeeQuantPlanck, OneSignaPlanck} from '@signumjs/util';
import {countCodePages} from './countCodePages';

/**
 * Calculates the minimum creation fee of the contract
 *
 * @param hexCode The contracts code in hex form
 * @return The minimum fee
 * @module contracts
 */
export function calculateMinimumCreationFee(hexCode: string): Amount {
    const DataPages = 1; // no data supported yet, so we put minimum value
    return Amount
        .fromPlanck(FeeQuantPlanck * 10)
        .multiply(2 + countCodePages(hexCode) + DataPages);
}
