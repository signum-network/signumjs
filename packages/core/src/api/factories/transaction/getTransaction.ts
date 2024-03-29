/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 * Modified work Copyright (c) 2023 Signum Network
 */
import {ChainService} from '../../../service/chainService';
import {Transaction} from '../../../typings/transaction';

/**
 * Use with [[ApiComposer]] and belongs to [[TransactionApi]].
 *
 * See details at [[TransactionApi.getTransaction]]
 * @module core.api.factories
 */
export const getTransaction = (service: ChainService):
    (transactionId: string) => Promise<Transaction> =>
    (transactionId: string): Promise<Transaction> =>
        service.query('getTransaction', {transaction: transactionId});
