import {Block} from './block';

/**
 * Original work Copyright (c) 2020 Burst Apps Team
 */

/**
 * Block List
 * @module core
 */
export interface BlockList extends Indexable {
    blocks: Block[];
    requestProcessingTime: number;
}
