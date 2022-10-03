/**
 * Modified work Copyright (c) 2019 Burst Apps Team
 */
import {ChainService} from '../../../service/chainService';
import {Asset} from '../../../typings/asset';
import {GetAssetArgs} from '../../../typings/args';

/**
 * Use with [[ApiComposer]] and belongs to [[AssetApi]].
 *
 * See details at [[AssetApi.getAsset]]
 * @module core.api.factories
 * */
export const getAsset = (service: ChainService):
    (args: GetAssetArgs) => Promise<Asset> =>
    (args: GetAssetArgs): Promise<Asset> =>
        service.query('getAsset', {
            asset: args.assetId,
            quantityMinimumQNT: args.minimumQuantity,
            heightStart: args.heightStart,
            heightEnd: args.heightEnd
        });
