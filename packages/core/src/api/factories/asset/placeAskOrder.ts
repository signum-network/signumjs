/**
 * Copyright (c) 2020 Burst Apps Team
 * Modified (c) 2022 Signum Network
 */
import {ChainService} from '../../../service/chainService';
import {PlaceOrderArgs} from '../../../typings/args';
import {placeOrder} from './placeOrder';

/**
 *
 * Use with [[ApiComposer]] and belongs to [[AssetApi.placeAskOrder]].
 *
 * See details at [[AssetApi.placeAskOrder]]
 * @module core.api.factories
 *
 */
export const placeAskOrder = (service: ChainService) =>
    async (args: PlaceOrderArgs) =>
        placeOrder(service)({
            type: 'ask',
            ...args,
        });
