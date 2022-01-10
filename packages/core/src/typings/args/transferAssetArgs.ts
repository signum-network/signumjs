import {DefaultSendArgs} from './defaultSendArgs';


/**
 * The argument object for [[AssetApi.transferAsset]]
 *
 * @module core
 */
export interface TransferAssetArgs extends DefaultSendArgs {
    /**
     * The assets id to be transferred
     */
    asset: string;
    /**
     * The amount of assets to be transferred (take the decimals into consideration)
     * If you set decimals to 4 and want to have 100 full assets, you need to set this value to 1000000
     */
    quantity: string | number;
    /**
     * The id of the recipient
     */
    recipientId: string;
    /**
     * The _optional_ recipients public key in hex format.
     */
    recipientPublicKey?: string;
}
