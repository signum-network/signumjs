/**
 * Original work Copyright (c) 2022 Signum Network
 */
import {ChainService} from '../../../service';
import {GetAssetOpenOrdersPerAssetArgs} from '../../../typings/args';
import {AssetAskOrderList} from '../../../typings/assetAskOrderList';
import {getOpenOrdersPerAsset} from './getOpenOrdersPerAsset';

/**
 *
 * Use with {@link ApiComposer} and belongs to {@link AssetApi.getOpenAskOrdersPerAsset}.
 *
 * See details at {@link AssetApi.getOpenAskOrdersPerAsset}
 * 
*
* @category factories
*/
export const getOpenAskOrdersPerAsset = (service: ChainService):
    (args: GetAssetOpenOrdersPerAssetArgs) => Promise<AssetAskOrderList> =>
    (args: GetAssetOpenOrdersPerAssetArgs): Promise<AssetAskOrderList> =>
        getOpenOrdersPerAsset(service)({...args, type: 'ask'}) as Promise<AssetAskOrderList>;
