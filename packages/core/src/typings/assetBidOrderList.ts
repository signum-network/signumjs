/**
 * Original work Copyright (c) 2022 Signum Network
 */

import {AssetOrder} from './assetOrder';

/**
 * Asset Bid Order List
 * @module core
 */
export interface AssetBidOrderList {
    bidOrders: AssetOrder[];
    requestProcessingTime: number;
}
