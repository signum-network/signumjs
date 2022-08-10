import {DefaultSendArgs} from './defaultSendArgs';


/**
 * The argument object for [[AssetApi.issueAsset]]
 *
 * @module core
 */
export interface MintAssetArgs extends DefaultSendArgs {
    /**
     * The asset/token id to be minted. Note: Asset must be mintable
     */
    assetId: string;
    /**
     * The amount of assets to be minted (take the decimals into consideration)
     * If you set decimals to 4 and want to have 100 full assets, you need to set this value to 1000000
     */
    quantity: string | number;
}
