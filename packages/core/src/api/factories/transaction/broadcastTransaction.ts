/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 * Modified work Copyright (c) 2022 Signum Network
 */
import {ChainService} from '../../../service/chainService';
import {TransactionId} from '../../../typings/transactionId';

/**
 * Use with {@link ApiComposer} and belongs to {@link TransactionApi}.
 *
 * See details at {@link TransactionApi.broadcastTransaction}
*
* @category factories
*/
export const broadcastTransaction = (service: ChainService):
    (signedTransactionPayload: string) => Promise<TransactionId> =>
    (signedTransactionPayload: string): Promise<TransactionId> =>
        service.send<TransactionId>('broadcastTransaction', {transactionBytes: signedTransactionPayload});
