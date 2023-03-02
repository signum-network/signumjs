/**
 * Original work Copyright (c) 2022 Signum Network
 */

import {AssetOrder} from './assetOrder';
import {Indexable} from './indexable';

/**
 * Asset Ask Order List
 * @module core
 */
export interface AssetAskOrderList extends Indexable {
    askOrders: AssetOrder[];
    requestProcessingTime: number;
}
