/**
 * Original work Copyright (c) 2019 Burst Apps Team
 */
import {ChainService} from '../../../service/chainService';
import {SubscriptionList} from '../../../typings/subscriptionList';

/**
 * Use with {@link ApiComposer} and belongs to {@link AccountApi}.
 *
 * See details at {@link AccountApi.getAccountSubscriptions}
*
* @category factories
*/
export const getAccountSubscriptions = (service: ChainService):
    (accountId: string) => Promise<SubscriptionList> =>
    (accountId: string): Promise<SubscriptionList> => {

        const parameters = {
            account: accountId,
        };

        return service.query('getAccountSubscriptions', parameters);
    };
