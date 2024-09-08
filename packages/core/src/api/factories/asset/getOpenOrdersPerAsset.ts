/**
 * Original work Copyright (c) 2022 Signum Network
 */
import {ChainService} from '../../../service';
import {GetAssetOpenOrdersPerAssetArgs} from '../../../typings/args';
import {AssetAskOrderList} from '../../../typings/assetAskOrderList';
import {AssetBidOrderList} from '../../../typings/assetBidOrderList';

/**
 * @ignore
 */
interface GetGenericAssetOpenOrdersPerAsset extends GetAssetOpenOrdersPerAssetArgs {
    type: 'bid' | 'ask';
}

/**
 * @ignore
 * This is an internal helper
 * See details at {@link AssetApi.getOpenAskOrders} {@link AssetApi.getOpenBidOrders}
*
* @category factories
*/
export const getOpenOrdersPerAsset = (service: ChainService):
    (args: GetGenericAssetOpenOrdersPerAsset) => Promise<AssetAskOrderList | AssetBidOrderList> =>
    async (args: GetGenericAssetOpenOrdersPerAsset): Promise<AssetAskOrderList | AssetBidOrderList> => {

        const {type, firstIndex, lastIndex, assetId} = args;

        const params = {
            asset: assetId,
            firstIndex,
            lastIndex
        };
        switch (type) {
            case 'ask':
                return service.query<AssetAskOrderList>('getAskOrders', params);
            case 'bid':
                return service.query<AssetBidOrderList>('getBidOrders', params);
        }

    };
