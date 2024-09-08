/**
 * Original work Copyright (c) 2020 Burst Apps Team
 */
import {ChainService} from '../../../service/chainService';
import {UnconfirmedTransactionList} from '../../../typings/unconfirmedTransactionList';

/**
 * Use with {@link ApiComposer} and belongs to {@link AccountApi}.
 *
 * See details at {@link AccountApi.getUnconfirmedAccountTransactions}
*
* @category factories
*/
export const getUnconfirmedAccountTransactions = (service: ChainService):
    (
        accountId: string,
        includeIndirect?: boolean
    ) => Promise<UnconfirmedTransactionList> =>
    (
        accountId: string,
        includeIndirect ?: boolean
    ): Promise<UnconfirmedTransactionList> =>
        service.query('getUnconfirmedTransactions', {
                account: accountId,
                includeIndirect
            }
        );
