/**
 * Original work Copyright (c) 2022 Signum Network
 */
import {ChainService} from '../../../service';
import {GetAssetTradesPerAssetArgs} from '../../../typings/args';
import {getAssetTrades} from './getAssetTrades';
import {AssetTradeList} from '../../../typings/assetTradeList';

/**
 * Use with {@link ApiComposer} and belongs to {@link AssetApi}.
 *
 * See details at {@link AssetApi.getAssetTradesPerAsset}
*
* @category factories
*/
export const getAssetTradesPerAsset = (service: ChainService):
    (args: GetAssetTradesPerAssetArgs) => Promise<AssetTradeList> =>
    (args: GetAssetTradesPerAssetArgs): Promise<AssetTradeList> => getAssetTrades(service)({
        assetId: args.assetId,
        firstIndex: args.firstIndex,
        lastIndex: args.lastIndex
    });
