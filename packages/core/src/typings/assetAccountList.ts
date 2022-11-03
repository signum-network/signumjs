
/**
 * Original work Copyright (c) 2022 Signum Network
 */

import {AssetAccount} from './assetAccount';
import {Indexable} from './indexable';

/**
 * Asset Account List
 * @module core
 */
export interface AssetAccountList extends Indexable {
    accountAssets: AssetAccount[];
    requestProcessingTime: number;
}
