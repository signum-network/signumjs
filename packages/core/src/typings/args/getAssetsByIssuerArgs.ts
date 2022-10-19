/**
 * The argument object for [[AssetApi.getAssetsByIssuer]]
 *
 * @module core
 */
import {GetAllAssetsArgs} from './getAllAssetsArgs';

export interface GetAssetsByIssuerArgs extends GetAllAssetsArgs {
    accountId: string;
}
