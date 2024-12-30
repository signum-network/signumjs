/**
 * Original work Copyright (c) 2019 Burst Apps Team
 * Modified work Copyright (c) 2022 Signum Network
 */
import {ChainService} from '../../../service/chainService';
import {TransactionList} from '../../../typings/transactionList';
import {GetAccountTransactionsSenderRecipientArgs} from '../../../typings/args/getAccountTransactionsSenderRecipientArgs';

/**
 * Use with {@link ApiComposer} and belongs to {@link AccountApi}.
 *
 *
 * See details at {@link AccountApi.getAccountTransactionsBetweenSenderAndRecipient}
*
* @category factories
*/
export const getAccountTransactionsBetweenSenderAndRecipient = (service: ChainService):
    (args:GetAccountTransactionsSenderRecipientArgs) => Promise<TransactionList> =>
    async (args: GetAccountTransactionsSenderRecipientArgs): Promise<TransactionList> => {

        const parameters = {
            ...args,
            sender: args.senderId,
            recipient: args.recipientId,
            bidirectional: true
        };

        delete parameters.senderId;
        delete parameters.recipientId;

        return service.query<TransactionList>('getAccountTransactions', parameters);

    };
