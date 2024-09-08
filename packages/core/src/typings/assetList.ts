import {Asset} from './asset';
import {Indexable} from './indexable';

/**
 * Original work Copyright (c) 2019 Burst Apps Team
 */

/**
 * Asset List
 *
 * @category entities
 */
export interface AssetList extends Indexable {
    assets: Asset[];
    requestProcessingTime: number;
}
