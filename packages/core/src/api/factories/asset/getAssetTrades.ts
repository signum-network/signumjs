/**
 * Original work Copyright (c) 2022 Signum Network
 */
import {ChainService} from '../../../service';
import {AssetTransferList} from '../../../typings/assetTransferList';
import {GetAssetTransfersArgs} from '../../../typings/args';
import {GetAssetTradesArgs} from '../../../typings/args/getAssetTradesArgs';
import {AssetTradeList} from '../../../typings/assetTradeList';
import {convertAssetPriceToPlanck} from '../../../internal/convertAssetPricing';


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

        const result = await service.query<AssetTradeList>('getTrades', params);
        const convertedTrades = result.trades.map(t => ({...t, priceNQT: convertAssetPriceToPlanck(t.priceNQT, t.decimals)}));
        return {
            ...result,
            trades: convertedTrades
        };
    };
