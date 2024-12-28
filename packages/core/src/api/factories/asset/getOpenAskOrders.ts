/**
 * Original work Copyright (c) 2022 Signum Network
 */
import {ChainService} from '../../../service';
import {GetAssetOpenOrdersArgs} from '../../../typings/args';
import {AssetAskOrderList} from '../../../typings/assetAskOrderList';
import {getOpenOrders} from './getOpenOrders';

/**
 *
 * Use with {@link ApiComposer} and belongs to {@link AssetApi.getOpenAskOrders}.
 *
 * See details at {@link AssetApi.getOpenAskOrders}
 * 
*
* @category factories
*/
export const getOpenAskOrders = (service: ChainService):
    (args: GetAssetOpenOrdersArgs) => Promise<AssetAskOrderList> =>
    (args: GetAssetOpenOrdersArgs): Promise<AssetAskOrderList> =>
        getOpenOrders(service)({...args, type: 'ask'}) as Promise<AssetAskOrderList>;
