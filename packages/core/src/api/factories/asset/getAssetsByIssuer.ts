/**
 * Copyright (c) 2022 Signum Network
 */
import {ChainService} from '../../../service';
import {AssetList} from '../../../typings/assetList';
import {GetAssetsByIssuerArgs} from '../../../typings/args';

/**
 * Use with {@link ApiComposer} and belongs to {@link AssetApi}.
 *
 * See details at {@link AssetApi.getAssetsByIssuer}
*
* @category factories
*/
export const getAssetsByIssuer = (service: ChainService):
    (args: GetAssetsByIssuerArgs) => Promise<AssetList> =>
    (args: GetAssetsByIssuerArgs): Promise<AssetList> => {
            const params = {
                account: args.accountId,
                firstIndex: args.firstIndex,
                lastIndex: args.lastIndex,
                heightStart: args.heightStart,
                heightEnd: args.heightEnd,
                skipZeroVolume: args.skipZeroVolume,
            };
        return service.query<AssetList>('getAssetsByIssuer', params);
    };
