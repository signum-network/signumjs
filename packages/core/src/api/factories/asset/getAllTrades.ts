/**
 * Copyright (c) 2022 Signum Network
 */
import {ChainService} from '../../../service';
import {GetAllTradesArgs} from '../../../typings/args/getAllTradesArgs';
import {AssetTradeList} from '../../../typings/assetTradeList';

/**
 * Use with [[ApiComposer]] and belongs to [[AssetApi]].
 *
 * See details at [[AssetApi.getAllTrades]]
 * @module core.api.factories
 */
export const getAllTrades = (service: ChainService):
    (args: GetAllTradesArgs) => Promise<AssetTradeList> =>
    (args: GetAllTradesArgs): Promise<AssetTradeList> => {
        const params = {
            ...args,
            includeAssetInfo: args.includeAssetInfo || true
        };
        return service.query('getAllAssets', params);
    };
