
/**
 * Original work Copyright (c) 2022 Signum Network
 */

import {AssetAccount} from './assetAccount';

/**
 * Asset Account List
 * @module core
 */
export interface AssetAccountList {
    accountAssets: AssetAccount[];
    requestProcessingTime: number;
}
