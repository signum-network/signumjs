/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 */
import {ChainService} from '../../../service';
import {Subscription} from '../../..';

/**
 * Use with {@link ApiComposer} and belongs to {@link TransactionApi}.
 *
 * See details at {@link TransactionApi.getSubscription}
*
* @category factories
*/
export const getSubscription = (service: ChainService):
    (subscriptionId: string) => Promise<Subscription> =>
    (subscriptionId: string): Promise<Subscription> =>
        service.query('getSubscription', {subscription: subscriptionId});
