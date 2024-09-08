/**
 * Original work Copyright (c) 2022 Signum Network
 */
import {ChainService} from '../../../service';
import { GetTradeHistoryPerAccountArgs} from '../../../typings/args';
import {TradeHistory} from '../../../typings/tradeHistory';

/**
 * Use with {@link ApiComposer} and belongs to {@link AssetApi}.
 *
 * See details at {@link AssetApi.getAssetTransfersPerAccount}
*
* @category factories
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
