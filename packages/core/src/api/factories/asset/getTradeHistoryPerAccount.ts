/**
 * Original work Copyright (c) 2022 Signum Network
 */
import {ChainService} from '../../../service';
import {GetAssetTradesPerAccountArgs, GetTradeHistoryPerAccountArgs} from '../../../typings/args';
import {getAssetTrades} from './getAssetTrades';
import {TradeHistory} from '../../../typings/tradeHistory';

/**
 * Use with [[ApiComposer]] and belongs to [[AssetApi]].
 *
 * See details at [[AssetApi.getAssetTransfersPerAccount]]
 * @module core.api.factories
 */
export const getTradeHistoryPerAccount = (service: ChainService):
    (args: GetTradeHistoryPerAccountArgs) => Promise<TradeHistory> =>
    (args: GetTradeHistoryPerAccountArgs): Promise<TradeHistory> => {
            const {accountId, assetId, firstIndex, lastIndex} = args;

            const params = {
                asset: assetId,
                account: accountId,
                firstIndex,
                lastIndex
            };

            return service.query<TradeHistory>('getTradeJournal', params);

    };
