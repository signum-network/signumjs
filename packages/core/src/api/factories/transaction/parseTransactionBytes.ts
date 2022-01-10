/**
 * Original work Copyright (c) 2022 Signum Network
 */
import {ChainService} from '../../../service/chainService';
import {Transaction} from '../../../typings/transaction';

/**
 * Use with [[ApiComposer]] and belongs to [[TransactionApi]].
 *
 * See details at [[TransactionApi.parseTransactionBytes]]
 * @module core.api.factories
 */
export const parseTransactionBytes = (service: ChainService):
    (transactionHexBytes: string) => Promise<Transaction> =>
    (transactionHexBytes: string): Promise<Transaction> =>
        service.query('parseTransaction', {transactionBytes: transactionHexBytes});
