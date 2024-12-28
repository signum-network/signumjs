/**
 * Copyright (c) 2020 Burst Apps Team
 * Modified (c) 2022 Signum Network
 */
import {ChainService} from '../../../service/chainService';
import {PlaceOrderArgs} from '../../../typings/args';
import {placeOrder} from './placeOrder';

/**
 *
 * Use with {@link ApiComposer} and belongs to {@link AssetApi.placeAskOrder}.
 *
 * See details at {@link AssetApi.placeAskOrder}
 * 
*
* @category factories
*/
export const placeAskOrder = (service: ChainService) =>
    async (args: PlaceOrderArgs) =>
        placeOrder(service)({
            type: 'ask',
            ...args,
        });
