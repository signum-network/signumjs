/**
 * Original work Copyright (c) 2022 Signum Network
 */
import {ChainService} from '../../../service';
import {GetAssetOpenOrdersArgs} from '../../../typings/args';
import {AssetBidOrderList} from '../../../typings/assetBidOrderList';
import {getOpenOrders} from './getOpenOrders';

/**
 *
 * Use with {@link ApiComposer} and belongs to {@link AssetApi.getOpenBidOrders}.
 *
 * See details at {@link AssetApi.getOpenBidOrders}
 * 
*
* @category factories
*/
export const getOpenBidOrders = (service: ChainService):
    (args: GetAssetOpenOrdersArgs) => Promise<AssetBidOrderList> =>
    (args: GetAssetOpenOrdersArgs): Promise<AssetBidOrderList> =>
        getOpenOrders(service)({...args, type: 'bid'}) as Promise<AssetBidOrderList>;
