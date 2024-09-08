/**
 * Original work Copyright (c) 2022 Signum Network
 */

import {AssetOrder} from './assetOrder';
import {Indexable} from './indexable';

/**
 * Asset Bid Order List
 *
 * @category entities
 */
export interface AssetBidOrderList extends Indexable {
    bidOrders: AssetOrder[];
    requestProcessingTime: number;
}
