import {DefaultSendArgs} from './defaultSendArgs';
import {MultioutAssetQuantities} from '../multioutAssetQuantities';


/**
 * The argument object for [[AssetApi.transferMultipleAsset]]
 *
 * @module core
 */
export interface TransferMultipleAssetsArgs extends DefaultSendArgs {
    /**
     * The list of assets and its quantities. Maximum 4 are allowed
     */
    assetQuantities: MultioutAssetQuantities[];
    /**
     * An _optional_ amount in Planck to be sent
     */
    amountPlanck?: string ;
    /**
     * The id of the recipient
     */
    recipientId: string;
    /**
     * The _optional_ recipients public key in hex format.
     */
    recipientPublicKey?: string;
}
