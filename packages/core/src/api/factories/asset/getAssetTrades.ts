/**
 * Original work Copyright (c) 2022 Signum Network
 */
import {ChainService} from '../../../service';
import {GetAssetTradesArgs} from '../../../typings/args';
import {AssetTradeList} from '../../../typings/assetTradeList';

/**
 * Use with {@link ApiComposer} and belongs to {@link AssetApi}.
 *
 * See details at {@link AssetApi.getAssetTrades}
*
* @category factories
*/
export const getAssetTrades = (service: ChainService):
    (args: GetAssetTradesArgs) => Promise<AssetTradeList> =>
    async (args: GetAssetTradesArgs): Promise<AssetTradeList> => {

        const {assetId, accountId, firstIndex, lastIndex, includeAssetInfo = true} = args;

        const params = {
            asset: assetId,
            account: accountId,
            includeAssetInfo,
            firstIndex,
            lastIndex
        };
        return service.query<AssetTradeList>('getTrades', params);
    };
