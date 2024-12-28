/**
 * Original work Copyright (c) 2022 Signum Network
 */
import {ChainService} from '../../../service';
import {GetAssetOpenOrdersPerAccountArgs} from '../../../typings/args';
import {AssetAskOrderList} from '../../../typings/assetAskOrderList';
import {getOpenOrdersPerAccount} from './getOpenOrdersPerAccount';

/**
 *
 * Use with {@link ApiComposer} and belongs to {@link AssetApi.getOpenAskOrdersPerAccount}.
 *
 * See details at {@link AssetApi.getOpenAskOrdersPerAccount}
 * 
*
* @category factories
*/
export const getOpenAskOrdersPerAccount = (service: ChainService):
    (args: GetAssetOpenOrdersPerAccountArgs) => Promise<AssetAskOrderList> =>
    (args: GetAssetOpenOrdersPerAccountArgs): Promise<AssetAskOrderList> =>
        getOpenOrdersPerAccount(service)({...args, type: 'ask'}) as Promise<AssetAskOrderList>;
