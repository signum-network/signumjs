/**
 * Original Work Copyright (c) 2019 Burst Apps Team
 * Modified Work Copyright (c) 2022 Signum Network
 */

import {Amount, FeeQuantPlanck} from '@signumjs/util';
import {countCodePages} from './countCodePages';
import {countDataPages} from './countDataPages';

/**
 * Calculates the minimum creation fee of the contract
 *
 * @param args The arguments
 * @return The minimum fee
 * @module contracts
 */
export function calculateMinimumCreationFee(args: CalculateMinimumCreationFeeArgs): Amount {

    const {hexData, hexCode} = args;

    const codePagesCount = hexCode ? countCodePages(hexCode) : 0;
    const dataPagesCount = hexData ? countDataPages(hexData) : 0;

    return Amount.fromPlanck(FeeQuantPlanck * 10 * (2 + codePagesCount + dataPagesCount));
}
