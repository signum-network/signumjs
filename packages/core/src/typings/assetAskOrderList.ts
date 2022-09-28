/**
 * Original work Copyright (c) 2022 Signum Network
 */

import {AssetOrder} from './assetOrder';

/**
 * Asset Ask Order List
 * @module core
 */
export interface AssetAskOrderList extends Indexable {
    askOrders: AssetOrder[];
    requestProcessingTime: number;
}
