import {DefaultSendArgs} from './defaultSendArgs';

/**
 * The argument object for {@link AssetApi.cancelAskOrder} and {@link AssetApi.cancelBidOrder}
 *
*
* @category args
*/
export interface CancelOrderArgs extends DefaultSendArgs {
    /**
     * The order (transaction id) to be cancelled
     */
    order: string;
}
