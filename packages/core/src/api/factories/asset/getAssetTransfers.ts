/**
 * Original work Copyright (c) 2022 Signum Network
 */
import {ChainService} from '../../../service';
import {AssetTransferList} from '../../../typings/assetTransferList';
import {GetAssetTransfersArgs} from '../../../typings/args';

/**
 * Use with {@link ApiComposer} and belongs to {@link AssetApi}.
 *
 * See details at {@link AssetApi.getAssetTransfers}
*
* @category factories
*/
export const getAssetTransfers = (service: ChainService):
    (args: GetAssetTransfersArgs) => Promise<AssetTransferList> =>
    (args: GetAssetTransfersArgs): Promise<AssetTransferList> => {


        if (!args.assetId || !args.accountId) {
            throw new Error('Need at least argument "assetId" or "accountId"');
        }

        const {assetId, accountId, firstIndex, lastIndex} = args;


        const params = {
            asset: assetId,
            account: accountId,
            includeAssetInfo: true,
            firstIndex,
            lastIndex
        };

        return service.query('getAssetTransfers', params);

    };
