/**
 * Original work Copyright (c) 2023 Signum Network
 */
import {ChainService} from '../../../service';
import {GetSubscriptionPaymentsArgs, Subscription, TransactionList} from '../../..';

/**
 * Use with [[ApiComposer]] and belongs to [[TransactionApi]].
 *
 * See details at [[TransactionApi.getSubscriptionPayments]]
 * @module core.api.factories
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
