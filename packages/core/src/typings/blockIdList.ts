import {BlockId} from './blockId';
import {Indexable} from './indexable';

/**
 * Original work Copyright (c) 2020 Burst Apps Team
 */

/**
 * Block Id List
 * @category entities
 */
export interface BlockIdList extends Indexable{
    blockIds: BlockId[];
    requestProcessingTime: number;
}
