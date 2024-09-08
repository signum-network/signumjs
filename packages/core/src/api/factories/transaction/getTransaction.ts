/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 * Modified work Copyright (c) 2023 Signum Network
 */
import {ChainService} from '../../../service/chainService';
import {Transaction} from '../../../typings/transaction';

/**
 * Use with {@link ApiComposer} and belongs to {@link TransactionApi}.
 *
 * See details at {@link TransactionApi.getTransaction}
*
* @category factories
*/
export const getTransaction = (service: ChainService):
    (transactionId: string) => Promise<Transaction> =>
    (transactionId: string): Promise<Transaction> =>
        service.query('getTransaction', {transaction: transactionId});
