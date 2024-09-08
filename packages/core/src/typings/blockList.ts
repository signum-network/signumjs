import {Block} from './block';
import {Indexable} from './indexable';

/**
 * Original work Copyright (c) 2020 Burst Apps Team
 */

/**
 * Block List
 * @category entities
 */
export interface BlockList extends Indexable {
    blocks: Block[];
    requestProcessingTime: number;
}
