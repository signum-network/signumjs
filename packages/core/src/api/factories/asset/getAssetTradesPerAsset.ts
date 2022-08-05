/**
 * Original work Copyright (c) 2022 Signum Network
 */
import {ChainService} from '../../../service';
import {AssetTransferList} from '../../../typings/assetTransferList';
import {GetAssetTradesPerAssetArgs} from '../../../typings/args';
import {getAssetTrades} from './getAssetTrades';

/**
 * Use with [[ApiComposer]] and belongs to [[AssetApi]].
 *
 * See details at [[AssetApi.getAssetTradesPerAsset]]
 * @module core.api.factories
 */
export const getAssetTradesPerAsset = (service: ChainService):
    (args: GetAssetTradesPerAssetArgs) => Promise<AssetTransferList> =>
    (args: GetAssetTradesPerAssetArgs): Promise<AssetTransferList> => getAssetTrades(service)({
        assetId: args.assetId,
        includeAssetInfo: args.includeAssetInfo,
        firstIndex: args.firstIndex,
        lastIndex: args.lastIndex
    });
