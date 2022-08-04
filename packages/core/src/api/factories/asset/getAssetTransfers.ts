/**
 * Original work Copyright (c) 2022 Signum Network
 */
import {ChainService} from '../../../service';
import {AssetTransferList} from '../../../typings/assetTransferList';
import {GetAssetTransfersArgs} from '../../../typings/args';

/**
 * Use with [[ApiComposer]] and belongs to [[AssetApi]].
 *
 * See details at [[AssetApi.getAssetTransfers]]
 * @module core.api.factories
 */
export const getAssetTransfers = (service: ChainService):
    (args: GetAssetTransfersArgs) => Promise<AssetTransferList> =>
    (args: GetAssetTransfersArgs): Promise<AssetTransferList> => {


        if (!args.assetId || !args.accountId) {
            throw new Error('Need at least argument "assetId" or "accountId"');
        }

        const {assetId, accountId, includeAssetInfo = false, firstIndex, lastIndex} = args;


        const params = {
            asset: assetId,
            account: accountId,
            includeAssetInfo,
            firstIndex,
            lastIndex
        };

        return service.query('getAssetTransfers', params);

    };
