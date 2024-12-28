import {GetAllAssetsArgs} from './getAllAssetsArgs';

/**
 * The argument object for {@link AssetApi.getAssetsByName}
 *
*
* @category args
*/
export interface GetAssetsByNameArgs extends GetAllAssetsArgs {
    name: string;
}
