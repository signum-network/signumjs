
/**
 * Original work Copyright (c) 2019 Burst Apps Team
 * Modified (c) 2023 Signum Network
 */

import {Transaction} from './transaction';
import {Indexable} from './indexable';

/**
 * Transaction List
 *
 * @module core
 * */
export interface TransactionList extends Indexable {
    readonly requestProcessingTime: number;
    readonly transactions: Transaction[];
}
