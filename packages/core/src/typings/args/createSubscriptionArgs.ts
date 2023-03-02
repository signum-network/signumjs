import {DefaultSendArgs} from './defaultSendArgs';

/**
 * The argument object for [[TransactionApi.createSubscription]]
 **
 * @module core
 */
export interface CreateSubscriptionArgs extends DefaultSendArgs {
    /**
     * The amount in planck to be paid periodically
     */
    amountPlanck: string;

    /**
     * The frequency of the recurring payments in seconds. Minimum is 3600 seconds
     */
    frequency: number;

    /**
     * The id of the recipient
     */
    recipientId: string;

    /**
     * The _optional_ recipients public key in hex format.
     * Using this arg allows to activate a recipients account, if not activated yet
     */
    recipientPublicKey?: string;
}
