/**
 * Original work Copyright (c) 2022 Signum Network
 */
import {ChainService} from '../../../service';
import {GetAssetTradesPerAccountArgs} from '../../../typings/args';
import {getAssetTrades} from './getAssetTrades';
import {AssetTradeList} from '../../../typings/assetTradeList';

/**
 * Use with {@link ApiComposer} and belongs to {@link AssetApi}.
 *
 * See details at {@link AssetApi.getAssetTransfersPerAccount}
*
* @category factories
*/
export const getAssetTradesPerAccount = (service: ChainService):
    (args: GetAssetTradesPerAccountArgs) => Promise<AssetTradeList> =>
    (args: GetAssetTradesPerAccountArgs): Promise<AssetTradeList> => getAssetTrades(service)({
        accountId: args.accountId,
        firstIndex: args.firstIndex,
        lastIndex: args.lastIndex
    });
