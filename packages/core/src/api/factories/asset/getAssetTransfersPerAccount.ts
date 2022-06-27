/**
 * Original work Copyright (c) 2022 Signum Network
 */
import {ChainService} from '../../../service';
import {AssetTransferList} from '../../../typings/assetTransferList';
import {GetAssetTransfersPerAccountArgs} from '../../../typings/args';
import {getAssetTransfers} from './getAssetTransfers';

/**
 * Use with [[ApiComposer]] and belongs to [[AssetApi]].
 *
 * See details at [[AssetApi.GetAssetTransfersPerAccount]]
 * @module core.api.factories
 */
export const getAssetTransfersPerAccount = (service: ChainService):
    (args: GetAssetTransfersPerAccountArgs) => Promise<AssetTransferList> =>
    (args: GetAssetTransfersPerAccountArgs): Promise<AssetTransferList> => getAssetTransfers(service)({
        accountId: args.accountId,
        includeAssetInfo: args.includeAssetInfo,
        firstIndex: args.firstIndex,
        lastIndex: args.lastIndex
    });
