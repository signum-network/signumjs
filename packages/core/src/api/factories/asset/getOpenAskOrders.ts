/**
 * Original work Copyright (c) 2022 Signum Network
 */
import {ChainService} from '../../../service';
import {GetAssetOpenOrdersArgs} from '../../../typings/args';
import {AssetAskOrderList} from '../../../typings/assetAskOrderList';
import {getOpenOrders} from './getOpenOrders';

/**
 *
 * Use with [[ApiComposer]] and belongs to [[AssetApi.getOpenAskOrders]].
 *
 * See details at [[AssetApi.getOpenAskOrders]]
 * @module core.api.factories
 *
 */
export const getOpenAskOrders = (service: ChainService):
    (args: GetAssetOpenOrdersArgs) => Promise<AssetAskOrderList> =>
    (args: GetAssetOpenOrdersArgs): Promise<AssetAskOrderList> =>
        getOpenOrders(service)({...args, type: 'ask'}) as Promise<AssetAskOrderList>;
