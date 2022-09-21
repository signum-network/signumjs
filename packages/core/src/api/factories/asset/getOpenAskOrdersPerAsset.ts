/**
 * Original work Copyright (c) 2022 Signum Network
 */
import {ChainService} from '../../../service';
import {GetAssetOpenOrdersPerAssetArgs} from '../../../typings/args';
import {AssetAskOrderList} from '../../../typings/assetAskOrderList';
import {getOpenOrdersPerAsset} from './getOpenOrdersPerAsset';

/**
 *
 * Use with [[ApiComposer]] and belongs to [[AssetApi.getOpenAskOrdersPerAsset]].
 *
 * See details at [[AssetApi.getOpenAskOrdersPerAsset]]
 * @module core.api.factories
 *
 */
export const getOpenAskOrdersPerAsset = (service: ChainService):
    (args: GetAssetOpenOrdersPerAssetArgs) => Promise<AssetAskOrderList> =>
    (args: GetAssetOpenOrdersPerAssetArgs): Promise<AssetAskOrderList> =>
        getOpenOrdersPerAsset(service)({...args, type: 'ask'}) as Promise<AssetAskOrderList>;
