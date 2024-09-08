/**
 * Original work Copyright (c) 2022 Signum Network
 */
import {ChainService} from '../../../service';
import {GetAssetOpenOrdersPerAssetArgs} from '../../../typings/args';
import {AssetBidOrderList} from '../../../typings/assetBidOrderList';
import {getOpenOrdersPerAsset} from './getOpenOrdersPerAsset';

/**
 *
 * Use with {@link ApiComposer} and belongs to {@link AssetApi.getOpenBidOrdersPerAsset}.
 *
 * See details at {@link AssetApi.getOpenBidOrdersPerAsset}
 * 
*
* @category factories
*/
export const getOpenBidOrdersPerAsset = (service: ChainService):
    (args: GetAssetOpenOrdersPerAssetArgs) => Promise<AssetBidOrderList> =>
    (args: GetAssetOpenOrdersPerAssetArgs): Promise<AssetBidOrderList> =>
        getOpenOrdersPerAsset(service)({...args, type: 'bid'}) as Promise<AssetBidOrderList>;
