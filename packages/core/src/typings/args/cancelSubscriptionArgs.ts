import {DefaultSendArgs} from './defaultSendArgs';

/**
 * The argument object for [[TransactionApi.cancelSubscription]]
 * @module core
 */
export interface CancelSubscriptionArgs extends DefaultSendArgs {
    /**
     The subscription to be cancelled
     */
    subscriptionId: string;
}
