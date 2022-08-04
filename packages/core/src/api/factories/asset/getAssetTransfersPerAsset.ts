/**
 * Original work Copyright (c) 2022 Signum Network
 */
import {ChainService} from '../../../service';
import {AssetTransferList} from '../../../typings/assetTransferList';
import {GetAssetTransfersPerAccountArgs, GetAssetTransfersPerAssetArgs} from '../../../typings/args';
import {getAssetTransfers} from './getAssetTransfers';

/**
 * Use with [[ApiComposer]] and belongs to [[AssetApi]].
 *
 * See details at [[AssetApi.getAssetTransfersPerAsset]]
 * @module core.api.factories
 */
export const getAssetTransfersPerAsset = (service: ChainService):
    (args: GetAssetTransfersPerAssetArgs) => Promise<AssetTransferList> =>
    (args: GetAssetTransfersPerAssetArgs): Promise<AssetTransferList> => getAssetTransfers(service)({
        assetId: args.assetId,
        includeAssetInfo: args.includeAssetInfo,
        firstIndex: args.firstIndex,
        lastIndex: args.lastIndex
    });
