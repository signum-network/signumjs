/**
 * Copyright (c) 2022 Signum Network
 */
import {ChainService} from '../../../service';
import {GetAllTradesArgs} from '../../../typings/args/getAllTradesArgs';
import {AssetTradeList} from '../../../typings/assetTradeList';
/**
 * Use with {@link ApiComposer} and belongs to {@link AssetApi}.
 *
 * See details at {@link AssetApi.getAllTrades}
*
* @category factories
*/
export const getAllTrades = (service: ChainService):
    (args: GetAllTradesArgs) => Promise<AssetTradeList> =>
    async (args: GetAllTradesArgs): Promise<AssetTradeList> => {
        const params = {
            ...args,
            includeAssetInfo: true
        };
        return service.query<AssetTradeList>('getAllTrades', params);
    };
