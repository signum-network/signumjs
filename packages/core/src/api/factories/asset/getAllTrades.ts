/**
 * Copyright (c) 2022 Signum Network
 */
import {ChainService} from '../../../service';
import {GetAllTradesArgs} from '../../../typings/args/getAllTradesArgs';
import {AssetTradeList} from '../../../typings/assetTradeList';
import {convertAssetPriceToPlanck} from '../../../internal/convertAssetPricing';

/**
 * Use with [[ApiComposer]] and belongs to [[AssetApi]].
 *
 * See details at [[AssetApi.getAllTrades]]
 * @module core.api.factories
 */
export const getAllTrades = (service: ChainService):
    (args: GetAllTradesArgs) => Promise<AssetTradeList> =>
    async (args: GetAllTradesArgs): Promise<AssetTradeList> => {
        const params = {
            ...args,
            includeAssetInfo: true
        };
        const result = await service.query<AssetTradeList>('getAllTrades', params);
        const convertedTrades = result.trades.map(t => ({...t, priceNQT: convertAssetPriceToPlanck(t.priceNQT, t.decimals)}));
        return {
            ...result,
            trades: convertedTrades
        };
    };
