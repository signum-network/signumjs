/**
 * Copyright (c) 2023 Signum Network
 */
import {ChainService} from '../../../service';
import {AssetList} from '../../../typings/assetList';
import {GetAssetsByIssuerArgs} from '../../../typings/args';

/**
 * Use with [[ApiComposer]] and belongs to [[AssetApi]].
 *
 * See details at [[AssetApi.getAssetsByOwner]]
 * @module core.api.factories
 */
export const getAssetsByOwner = (service: ChainService):
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
        return service.query<AssetList>('getAssetsByOwner', params);
    };
