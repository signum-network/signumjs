import {DefaultSendArgs} from './defaultSendArgs';


/**
 * The argument object for {@link AssetApi.placeAskOrder} and {@link AssetApi.placeBidOrder}
 *
*
* @category args
*/
export interface PlaceOrderArgs extends DefaultSendArgs {
    /**
     * The assets id
     */
    assetId: string;
    /**
     * The price that is offered for bid/ask
     */
    pricePlanck: string;
    /**
     * The amount of assets to ask/bid for
     */
    quantity: string | number;

    /**
     * The decimals of the targeted token, as it's required to calculate the correct price for the order.
     * If it is not passed, the decimals will be fetched from the chain (which includes an additional request)
     */
    decimals?: number;
}
