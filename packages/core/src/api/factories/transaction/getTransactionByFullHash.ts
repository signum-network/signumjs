/**
 * Original work Copyright (c) 2023 Signum Network
 */
import {ChainService} from '../../../service/chainService';
import {Transaction} from '../../../typings/transaction';

/**
 * Use with {@link ApiComposer} and belongs to {@link TransactionApi}.
 *
 * See details at {@link TransactionApi.getTransactionByFullHash}
*
* @category factories
*/
export const getTransactionByFullHash = (service: ChainService):
    (fullHash: string) => Promise<Transaction> =>
    (fullHash: string): Promise<Transaction> =>
        service.query('getTransaction', {fullHash: fullHash});
