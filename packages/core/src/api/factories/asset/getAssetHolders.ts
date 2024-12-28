/**
 * Original work Copyright (c) 2022 Signum Network
 */
import {ChainService} from '../../../service';
import {GetAssetHoldersArgs} from '../../../typings/args/';
import {AssetAccountList} from '../../../typings/assetAccountList';

/**
 * Use with {@link ApiComposer} and belongs to {@link AssetApi}.
 *
 * See details at {@link AssetApi.getAssetHolders}
*
* @category factories
*/
export const getAssetHolders = (service: ChainService):
    (args: GetAssetHoldersArgs) => Promise<AssetAccountList> =>
    (args: GetAssetHoldersArgs): Promise<AssetAccountList> => {

        const {assetId, ignoreTreasuryAccount = false, firstIndex, lastIndex, minimumQuantity} = args;


        const params = {
            asset: assetId,
            ignoreTreasury: ignoreTreasuryAccount,
            quantityMinimumQNT: minimumQuantity,
            firstIndex,
            lastIndex
        };

        return service.query('getAssetAccounts', params);

    };
