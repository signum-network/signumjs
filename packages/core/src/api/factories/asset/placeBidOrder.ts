/**
 * Copyright (c) 2020 Burst Apps Team
 * Modified (c) 2022 Signum Network
 */
import {ChainService} from '../../../service/chainService';
import {PlaceOrderArgs} from '../../../typings/args';
import {placeOrder} from './placeOrder';

/**
 *
 * Use with [[ApiComposer]] and belongs to [[AssetApi.placeBidOrder]].
 *
 * See details at [[AssetApi.placeBidOrder]]
 * @module core.api.factories
 *
 */
export const placeBidOrder = (service: ChainService) =>
    async (args: PlaceOrderArgs) =>
        placeOrder(service)({
            type: 'bid',
            ...args,
        });
