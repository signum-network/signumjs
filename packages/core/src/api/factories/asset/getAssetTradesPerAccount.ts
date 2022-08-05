/**
 * Original work Copyright (c) 2022 Signum Network
 */
import {ChainService} from '../../../service';
import {AssetTransferList} from '../../../typings/assetTransferList';
import {GetAssetTradesPerAccountArgs} from '../../../typings/args';
import {getAssetTrades} from './getAssetTrades';

/**
 * Use with [[ApiComposer]] and belongs to [[AssetApi]].
 *
 * See details at [[AssetApi.getAssetTransfersPerAccount]]
 * @module core.api.factories
 */
export const getAssetTradesPerAccount = (service: ChainService):
    (args: GetAssetTradesPerAccountArgs) => Promise<AssetTransferList> =>
    (args: GetAssetTradesPerAccountArgs): Promise<AssetTransferList> => getAssetTrades(service)({
        accountId: args.accountId,
        includeAssetInfo: args.includeAssetInfo,
        firstIndex: args.firstIndex,
        lastIndex: args.lastIndex
    });
