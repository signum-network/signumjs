/**
 * Original work Copyright (c) 2022 Signum Network
 */
import {ChainService} from '../../../service';
import {AssetTransferList} from '../../../typings/assetTransferList';
import {GetAssetTradesPerAssetArgs} from '../../../typings/args';
import {getAssetTrades} from './getAssetTrades';
import {AssetTradeList} from '../../../typings/assetTradeList';

/**
 * Use with [[ApiComposer]] and belongs to [[AssetApi]].
 *
 * See details at [[AssetApi.getAssetTradesPerAsset]]
 * @module core.api.factories
 */
export const getAssetTradesPerAsset = (service: ChainService):
    (args: GetAssetTradesPerAssetArgs) => Promise<AssetTradeList> =>
    (args: GetAssetTradesPerAssetArgs): Promise<AssetTradeList> => getAssetTrades(service)({
        assetId: args.assetId,
        firstIndex: args.firstIndex,
        lastIndex: args.lastIndex
    });
