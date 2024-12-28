/**
 * Original work Copyright (c) 2023 Signum Network
 */
import {ChainService} from '../../../service';
import {GetSubscriptionPaymentsArgs, TransactionList} from '../../..';

/**
 * Use with {@link ApiComposer} and belongs to {@link TransactionApi}.
 *
 * See details at {@link TransactionApi.getSubscriptionPayments}
*
* @category factories
*/
export const getSubscriptionPayments = (service: ChainService):
    (args: GetSubscriptionPaymentsArgs) => Promise<TransactionList> =>
    (args: GetSubscriptionPaymentsArgs): Promise<TransactionList> => {

    const params = {
        subscription: args.subscriptionId,
        firstIndex: args.firstIndex,
        lastIndex: args.lastIndex,
    };

        return service.query('getSubscriptionPayments', params);
    };
