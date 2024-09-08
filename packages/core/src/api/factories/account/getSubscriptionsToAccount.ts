/**
 * Original work Copyright (c) 2020 Burst Apps Team
 */
import {ChainService} from '../../../service/chainService';
import {TransactionList} from '../../../typings/transactionList';
import {GetAccountTransactionsArgs} from '../../../typings/args';
import {SubscriptionList} from '../../../typings/subscriptionList';

/**
 * Use with {@link ApiComposer} and belongs to {@link AccountApi}.
 *
 * See details at {@link AccountApi.getSubscriptionsToAccount}
*
* @category factories
*/
export const getSubscriptionsToAccount = (service: ChainService):
    (accountId: string) => Promise<SubscriptionList> =>
    (accountId: string): Promise<SubscriptionList> => {

        const parameters = {
            account: accountId,
        };

        return service.query('getSubscriptionsToAccount', parameters);
    };
