/**
 * Original work Copyright (c) 2022 Signum Network
 */
import {ChainService} from '../../../service';
import {AssetTransferList} from '../../../typings/assetTransferList';
import {GetAssetTransfersPerAssetArgs} from '../../../typings/args';
import {getAssetTransfers} from './getAssetTransfers';

/**
 * Use with {@link ApiComposer} and belongs to {@link AssetApi}.
 *
 * See details at {@link AssetApi.getAssetTransfersPerAsset}
*
* @category factories
*/
export const getAssetTransfersPerAsset = (service: ChainService):
    (args: GetAssetTransfersPerAssetArgs) => Promise<AssetTransferList> =>
    (args: GetAssetTransfersPerAssetArgs): Promise<AssetTransferList> => getAssetTransfers(service)({
        assetId: args.assetId,
        firstIndex: args.firstIndex,
        lastIndex: args.lastIndex
    });
