/**
 * Original work Copyright (c) 2022 Signum Network
 */
import {ChainService} from '../../../service';
import {GetAssetTradesArgs} from '../../../typings/args';
import {AssetTradeList} from '../../../typings/assetTradeList';

/**
 * Use with [[ApiComposer]] and belongs to [[AssetApi]].
 *
 * See details at [[AssetApi.getAssetTrades]]
 * @module core.api.factories
 */
export const getAssetTrades = (service: ChainService):
    (args: GetAssetTradesArgs) => Promise<AssetTradeList> =>
    async (args: GetAssetTradesArgs): Promise<AssetTradeList> => {

        const {assetId, accountId, firstIndex, lastIndex} = args;

        const params = {
            asset: assetId,
            account: accountId,
            includeAssetInfo: true,
            firstIndex,
            lastIndex
        };
        return service.query<AssetTradeList>('getTrades', params);
    };
