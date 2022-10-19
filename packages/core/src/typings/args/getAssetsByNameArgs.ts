/**
 * The argument object for [[AssetApi.getAssetsByName]]
 *
 * @module core
 */
import {GetAllAssetsArgs} from './getAllAssetsArgs';

export interface GetAssetsByNameArgs extends GetAllAssetsArgs {
    name: string;
}
