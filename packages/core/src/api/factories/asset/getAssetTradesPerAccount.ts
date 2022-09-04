/**
 * Original work Copyright (c) 2022 Signum Network
 */
import {ChainService} from '../../../service';
import {AssetTransferList} from '../../../typings/assetTransferList';
import {GetAssetTradesPerAccountArgs} from '../../../typings/args';
import {getAssetTrades} from './getAssetTrades';
import {AssetTradeList} from '../../../typings/assetTradeList';

/**
 * Use with [[ApiComposer]] and belongs to [[AssetApi]].
 *
 * See details at [[AssetApi.getAssetTransfersPerAccount]]
 * @module core.api.factories
 */
export const getAssetTradesPerAccount = (service: ChainService):
    (args: GetAssetTradesPerAccountArgs) => Promise<AssetTradeList> =>
    (args: GetAssetTradesPerAccountArgs): Promise<AssetTradeList> => getAssetTrades(service)({
        accountId: args.accountId,
        firstIndex: args.firstIndex,
        lastIndex: args.lastIndex
    });
