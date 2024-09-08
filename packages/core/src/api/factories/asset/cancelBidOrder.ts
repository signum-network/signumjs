/**
 * Copyright (c) 2020 Burst Apps Team
 * Modified (c) 2022 Signum Network
 */
import {ChainService} from '../../../service/chainService';
import {CancelOrderArgs} from '../../../typings/args';
import {cancelOrder} from './cancelOrder';

/**
 *
 * Use with {@link ApiComposer} and belongs to {@link AssetApi.cancelBidOrder}.
 *
 * See details at {@link AssetApi.cancelBidOrder}
 * 
*
* @category factories
*/
export const cancelBidOrder = (service: ChainService) =>
    async (args: CancelOrderArgs) =>
        cancelOrder(service)({
            type: 'bid',
            ...args,
        });
