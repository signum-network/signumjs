/**
 * Original work Copyright (c) 2022 Signum Network
 */
import {ChainService} from '../../../service';
import {GetAssetOpenOrdersPerAccountArgs} from '../../../typings/args';
import {AssetBidOrderList} from '../../../typings/assetBidOrderList';
import {getOpenOrdersPerAccount} from './getOpenOrdersPerAccount';

/**
 *
 * Use with [[ApiComposer]] and belongs to [[AssetApi.getOpenBidOrdersPerAccount]].
 *
 * See details at [[AssetApi.getOpenBidOrdersPerAccount]]
 * @module core.api.factories
 *
 */
export const getOpenBidOrdersPerAccount = (service: ChainService):
    (args: GetAssetOpenOrdersPerAccountArgs) => Promise<AssetBidOrderList> =>
    (args: GetAssetOpenOrdersPerAccountArgs): Promise<AssetBidOrderList> =>
        getOpenOrdersPerAccount(service)({...args, type: 'bid'}) as Promise<AssetBidOrderList>;
