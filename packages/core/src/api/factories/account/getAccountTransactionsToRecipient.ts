/**
 * Original work Copyright (c) 2019 Burst Apps Team
 * Modified work Copyright (c) 2022 Signum Network
 */
import {ChainService} from '../../../service/chainService';
import {TransactionList} from '../../../typings/transactionList';
import {GetAccountTransactionsSenderRecipientArgs} from '../../../typings/args/getAccountTransactionsSenderRecipientArgs';
import {TransactionAssetSubtype, TransactionType} from '../../../constants';
import {getDistributionAmountsFromTransaction} from '../transaction';

/**
 * Use with {@link ApiComposer} and belongs to {@link AccountApi}.
 *
 *
 * See details at {@link AccountApi.getAccountTransactionsToRecipient}
*
* @category factories
*/
export const getAccountTransactionsToRecipient = (service: ChainService):
    (args: Omit<GetAccountTransactionsSenderRecipientArgs, 'senderId'>) => Promise<TransactionList> =>
    async (args: Omit<GetAccountTransactionsSenderRecipientArgs, 'senderId'>): Promise<TransactionList> => {

        const parameters = {
            ...args,
            recipient: args.recipientId,
        };

        delete parameters.recipientId;

        return service.query<TransactionList>('getAccountTransactions', parameters);

    };
