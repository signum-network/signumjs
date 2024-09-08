/**
 * Original work Copyright (c) 2020 Burst Apps Team
 */
import {ChainService} from '../../../service';
import {UnconfirmedTransactionList} from '../../..';

/**
 * Use with {@link ApiComposer} and belongs to {@link TransactionApi}.
 *
 * See details at {@link TransactionApi.getUnconfirmedTransactions}
*
* @category factories
*/
export const getUnconfirmedTransactions = (service: ChainService):
    () => Promise<UnconfirmedTransactionList> =>
    (): Promise<UnconfirmedTransactionList> =>
        service.query('getUnconfirmedTransactions');
