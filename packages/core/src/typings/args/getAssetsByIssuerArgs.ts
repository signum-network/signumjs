import {GetAllAssetsArgs} from './getAllAssetsArgs';

/**
 * The argument object for {@link AssetApi.getAssetsByIssuer}
 *
*
* @category args
*/
export interface GetAssetsByIssuerArgs extends GetAllAssetsArgs {
    accountId: string;
}
