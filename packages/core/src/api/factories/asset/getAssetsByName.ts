/**
 * Copyright (c) 2022 Signum Network
 */
import {ChainService} from '../../../service';
import {AssetList} from '../../../typings/assetList';
import {GetAssetsByNameArgs} from '../../../typings/args';

/**
 * Use with [[ApiComposer]] and belongs to [[AssetApi]].
 *
 * See details at [[AssetApi.getAssetsByName]]
 * @module core.api.factories
 */
export const getAssetsByName = (service: ChainService):
    (args: GetAssetsByNameArgs) => Promise<AssetList> =>
    (args: GetAssetsByNameArgs): Promise<AssetList> => {
            const params = {
                name: args.name,
                firstIndex: args.firstIndex,
                lastIndex: args.lastIndex,
                heightStart: args.heightStart,
                heightEnd: args.heightEnd,
                skipZeroVolume: args.skipZeroVolume,
            };
        return service.query<AssetList>('getAssetsByName', params);
    };
