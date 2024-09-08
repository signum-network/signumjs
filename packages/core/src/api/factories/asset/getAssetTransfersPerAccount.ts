/**
 * Original work Copyright (c) 2022 Signum Network
 */
import {ChainService} from '../../../service';
import {AssetTransferList} from '../../../typings/assetTransferList';
import {GetAssetTransfersPerAccountArgs} from '../../../typings/args';
import {getAssetTransfers} from './getAssetTransfers';

/**
 * Use with {@link ApiComposer} and belongs to {@link AssetApi}.
 *
 * See details at {@link AssetApi.getAssetTransfersPerAccount}
*
* @category factories
*/
export const getAssetTransfersPerAccount = (service: ChainService):
    (args: GetAssetTransfersPerAccountArgs) => Promise<AssetTransferList> =>
    (args: GetAssetTransfersPerAccountArgs): Promise<AssetTransferList> => getAssetTransfers(service)({
        accountId: args.accountId,
        firstIndex: args.firstIndex,
        lastIndex: args.lastIndex
    });
