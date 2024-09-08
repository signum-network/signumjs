
/**
 * Original work Copyright (c) 2019 Burst Apps Team
 */

import {Transaction} from './transaction';

/**
 * Unconfirmed Transaction List
 * @category entities
 * */
export interface UnconfirmedTransactionList {
    readonly requestProcessingTime: number;
    readonly unconfirmedTransactions: Transaction[];
}
