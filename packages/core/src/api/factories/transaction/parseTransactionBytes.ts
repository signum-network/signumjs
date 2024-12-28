/**
 * Original work Copyright (c) 2022 Signum Network
 */
import {ChainService} from '../../../service/chainService';
import {Transaction} from '../../../typings/transaction';

/**
 * Use with {@link ApiComposer} and belongs to {@link TransactionApi}.
 *
 * See details at {@link TransactionApi.parseTransactionBytes}
*
* @category factories
*/
export const parseTransactionBytes = (service: ChainService):
    (transactionHexBytes: string) => Promise<Transaction> =>
    (transactionHexBytes: string): Promise<Transaction> =>
        service.query('parseTransaction', {transactionBytes: transactionHexBytes});
