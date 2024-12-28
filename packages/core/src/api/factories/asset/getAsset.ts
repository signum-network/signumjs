/**
 * Modified work Copyright (c) 2019 Burst Apps Team
 */
import {ChainService} from '../../../service/chainService';
import {Asset} from '../../../typings/asset';
import {GetAssetArgs} from '../../../typings/args';

/**
 * Use with {@link ApiComposer} and belongs to {@link AssetApi}.
 *
 * See details at {@link AssetApi.getAsset}
 * 
 * @category factories
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
