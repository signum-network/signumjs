/**
 * Original work Copyright (c) 2022 Signum Network
 */
import {ChainService} from '../../../service';
import {GetAssetHoldersArgs} from '../../../typings/args/';
import {AssetAccountList} from '../../../typings/assetAccountList';

/**
 * Use with [[ApiComposer]] and belongs to [[AssetApi]].
 *
 * See details at [[AssetApi.getAssetHolders]]
 * @module core.api.factories
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
