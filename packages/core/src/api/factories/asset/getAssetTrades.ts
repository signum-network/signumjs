/**
 * Original work Copyright (c) 2022 Signum Network
 */
import {ChainService} from '../../../service';
import {AssetTransferList} from '../../../typings/assetTransferList';
import {GetAssetTransfersArgs} from '../../../typings/args';
import {GetAssetTradesArgs} from '../../../typings/args/getAssetTradesArgs';

/**
 * Use with [[ApiComposer]] and belongs to [[AssetApi]].
 *
 * See details at [[AssetApi.getAssetTrades]]
 * @module core.api.factories
 */
export const getAssetTrades = (service: ChainService):
    (args: GetAssetTradesArgs) => Promise<AssetTransferList> =>
    (args: GetAssetTradesArgs): Promise<AssetTransferList> => {

        const {assetId, accountId, includeAssetInfo = false, firstIndex, lastIndex} = args;

        const params = {
            asset: assetId,
            account: accountId,
            includeAssetInfo,
            firstIndex,
            lastIndex
        };

        return service.query('getTrades', params);

    };
