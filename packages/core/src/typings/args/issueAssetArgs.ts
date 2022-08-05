import {DefaultSendArgs} from './defaultSendArgs';


/**
 * The argument object for [[AssetApi.issueAsset]]
 *
 * @module core
 */
export interface IssueAssetArgs extends DefaultSendArgs {
    /**
     * The decimals supported for this asset.
     * Example:
     * 1. a quantity of 1000 with decimal 2 allows 10 integer assets with 2 digit fraction, i.e 5.32
     * 1. a quantity of 1000 with decimal 0 allows 1000 integer assets which cannot be fractioned
     */
    decimals: number;
    /**
     * The description for this asset
     */
    description: string;
    /**
     * The name of the asset
     */
    name: string;
    /**
     * The amount of assets to be issued (take the decimals into consideration)
     * If you set decimals to 4 and want to have 100 full assets, you need to set this value to 1000000
     */
    quantity: string | number;

    /**
     * Decides whether this asset is mintable, i.e. has a variable supply.
     */
    mintable: boolean;
}
