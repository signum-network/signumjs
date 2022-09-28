import {Asset} from './asset';

/**
 * Original work Copyright (c) 2019 Burst Apps Team
 */

/**
 * Asset List
 * @module core
 */
export interface AssetList extends Indexable {
    assets: Asset[];
    requestProcessingTime: number;
}
