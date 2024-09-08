/**
 * Original work Copyright (c) 2022 Signum Network
 */
import {ChainService} from '../../../service';
import {GetAssetOpenOrdersArgs} from '../../../typings/args';
import {AssetAskOrderList} from '../../../typings/assetAskOrderList';
import {AssetBidOrderList} from '../../../typings/assetBidOrderList';

/**
 * @ignore
*/
interface GetGenericAssetOpenOrders extends GetAssetOpenOrdersArgs {
    type: 'bid' | 'ask';
}

/**
 * @ignore
 * This is an internal helper
 * See details at {@link AssetApi.getOpenAskOrders} {@link AssetApi.getOpenBidOrders}
*
* @category factories
*/
export const getOpenOrders = (service: ChainService):
    (args: GetGenericAssetOpenOrders) => Promise<AssetAskOrderList | AssetBidOrderList> =>
    async (args: GetGenericAssetOpenOrders): Promise<AssetAskOrderList | AssetBidOrderList> => {

        const {type, firstIndex, lastIndex} = args;

        const params = {
            firstIndex,
            lastIndex
        };
        switch (type) {
            case 'ask':
                return service.query<AssetAskOrderList>('getAllOpenAskOrders', params);
            case 'bid':
                return service.query<AssetBidOrderList>('getAllOpenBidOrders', params);
        }

    };
