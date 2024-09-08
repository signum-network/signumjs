
/**
 * Original work Copyright (c) 2020 Burst Apps Team
 */

import {Subscription} from './subscription';

/**
 * Subscription List
 *
 * @category entities
 * */
export interface SubscriptionList {
    readonly requestProcessingTime: number;
    readonly subscriptions: Subscription[];
}
