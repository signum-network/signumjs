/**
 * Original work Copyright (c) 2022 Signum Network
 */
import {ChainService} from '../../../service';
import {GetAssetOpenOrdersPerAssetArgs} from '../../../typings/args';
import {AssetBidOrderList} from '../../../typings/assetBidOrderList';
import {getOpenOrdersPerAsset} from './getOpenOrdersPerAsset';

/**
 *
 * Use with [[ApiComposer]] and belongs to [[AssetApi.getOpenBidOrdersPerAsset]].
 *
 * See details at [[AssetApi.getOpenBidOrdersPerAsset]]
 * @module core.api.factories
 *
 */
export const getOpenBidOrdersPerAsset = (service: ChainService):
    (args: GetAssetOpenOrdersPerAssetArgs) => Promise<AssetBidOrderList> =>
    (args: GetAssetOpenOrdersPerAssetArgs): Promise<AssetBidOrderList> =>
        getOpenOrdersPerAsset(service)({...args, type: 'bid'}) as Promise<AssetBidOrderList>;
