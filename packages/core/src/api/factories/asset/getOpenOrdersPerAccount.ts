/**
 * Original work Copyright (c) 2022 Signum Network
 */
import {ChainService} from '../../../service';
import {GetAssetOpenOrdersPerAccountArgs} from '../../../typings/args';
import {AssetAskOrderList} from '../../../typings/assetAskOrderList';
import {AssetBidOrderList} from '../../../typings/assetBidOrderList';

/**
 * @ignore
 */
interface GetGenericAssetOpenOrdersPerAccount extends GetAssetOpenOrdersPerAccountArgs {
    type: 'bid' | 'ask';
}

/**
 * @ignore
 * This is an internal helper
 * See details at [[AssetApi.getOpenAskOrders]] [[AssetApi.getOpenBidOrders]]
 * @module core.api.factories
 */
export const getOpenOrdersPerAccount = (service: ChainService):
    (args: GetGenericAssetOpenOrdersPerAccount) => Promise<AssetAskOrderList | AssetBidOrderList> =>
    async (args: GetGenericAssetOpenOrdersPerAccount): Promise<AssetAskOrderList | AssetBidOrderList> => {

        const {type, firstIndex, lastIndex, accountId, assetId} = args;

        const params = {
            account: accountId,
            asset: assetId,
            firstIndex,
            lastIndex
        };
        switch (type) {
            case 'ask':
                return service.query<AssetAskOrderList>('getAccountCurrentAskOrders', params);
            case 'bid':
                return service.query<AssetBidOrderList>('getAccountCurrentBidOrders', params);
        }

    };
