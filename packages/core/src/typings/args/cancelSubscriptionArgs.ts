import {DefaultSendArgs} from './defaultSendArgs';

/**
 * The argument object for {@link TransactionApi.cancelSubscription}
*
* @category args
*/
export interface CancelSubscriptionArgs extends DefaultSendArgs {
    /**
     The subscription to be cancelled
     */
    subscriptionId: string;
}
