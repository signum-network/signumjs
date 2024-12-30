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
 * See details at {@link AccountApi.getAccountTransactionsFromSender}
*
* @category factories
*/
export const getAccountTransactionsFromSender = (service: ChainService):
    (args: Omit<GetAccountTransactionsSenderRecipientArgs, 'recipientId'>) => Promise<TransactionList> =>
    async (args: Omit<GetAccountTransactionsSenderRecipientArgs, 'recipientId'>): Promise<TransactionList> => {

        const parameters = {
            ...args,
            sender: args.senderId,
        };

        delete parameters.senderId;

        return service.query<TransactionList>('getAccountTransactions', parameters);

    };
