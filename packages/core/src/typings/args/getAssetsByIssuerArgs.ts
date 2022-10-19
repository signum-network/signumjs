import {GetAllAssetsArgs} from './getAllAssetsArgs';

/**
 * The argument object for [[AssetApi.getAssetsByIssuer]]
 *
 * @module core
 */
export interface GetAssetsByIssuerArgs extends GetAllAssetsArgs {
    accountId: string;
}
