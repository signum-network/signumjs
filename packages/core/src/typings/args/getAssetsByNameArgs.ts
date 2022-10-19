import {GetAllAssetsArgs} from './getAllAssetsArgs';

/**
 * The argument object for [[AssetApi.getAssetsByName]]
 *
 * @module core
 */
export interface GetAssetsByNameArgs extends GetAllAssetsArgs {
    name: string;
}
