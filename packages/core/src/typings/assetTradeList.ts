/**
 * Original work Copyright (c) 2022 Signum Network
 */

import {AssetTrade} from './assetTrade';

/**
 * Asset Trade List
 * @module core
 */
export interface AssetTradeList {
    trades: AssetTrade[];
    requestProcessingTime: number;
}
