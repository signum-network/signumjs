import {DefaultSendArgs} from './defaultSendArgs';


/**
 * The argument object for {@link AssetApi.distributeToAssetHolders}
 *
*
* @category args
*/
export interface DistributeToAssetHoldersArgs extends DefaultSendArgs {
    /**
     * The related asset
     */
    assetId: string;
    /**
     * Distributes only to those who have a minimum amount of that token/asset
     */
    minimumHoldQuantity?: string;
    /**
     * Total Amount of Signa to be distributed, expressed in Planck
     */
    totalAmountPlanck: string;

    /**
     * You may distribute an additional asset, i.e. as air drop, together with this pay out.
     */
    additionalAssetId?: string;
    /**
     * If given `additionalAssetId`, then you need to specify a quantity that's being distributed together.
     */
    additionalAssetQuantity?: string;
}
