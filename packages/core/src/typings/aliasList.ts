/**
 * Original work Copyright (c) 2019 Burst Apps Team
 */
import {Alias} from './alias';
import {Indexable} from './indexable';

/**
 * Alias List
 *
 * @category entities
 */
export interface AliasList extends Indexable{
    aliases: Alias[];
    requestProcessingTime: number;
}
