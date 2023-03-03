/**
 * Original work Copyright (c) 2023 Signum Network
 */
import {ChainService} from '../../../service/chainService';
import {Transaction} from '../../../typings/transaction';

/**
 * Use with [[ApiComposer]] and belongs to [[TransactionApi]].
 *
 * See details at [[TransactionApi.getTransactionByFullHash]]
 * @module core.api.factories
 */
export const getTransactionByFullHash = (service: ChainService):
    (fullHash: string) => Promise<Transaction> =>
    (fullHash: string): Promise<Transaction> =>
        service.query('getTransaction', {fullHash: fullHash});
