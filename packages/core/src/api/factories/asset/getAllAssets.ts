/**
 * Modified work Copyright (c) 2019 Burst Apps Team
 */
import {ChainService} from '../../../service';
import {AssetList} from '../../../typings/assetList';
import {GetAllAssetsArgs} from '../../../typings/args/getAllAssetsArgs';

/**
 * Use with {@link ApiComposer} and belongs to {@link AssetApi}.
 *
 * See details at {@link AssetApi.getAllAssets}
*
* @category factories
*/
export const getAllAssets = (service: ChainService):
    (args: GetAllAssetsArgs) => Promise<AssetList> =>
    (args: GetAllAssetsArgs): Promise<AssetList> => service.query<AssetList>('getAllAssets', args);
