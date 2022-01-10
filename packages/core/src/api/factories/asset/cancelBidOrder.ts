/**
 * Copyright (c) 2020 Burst Apps Team
 * Modified (c) 2022 Signum Network
 */
import {ChainService} from '../../../service/chainService';
import {CancelOrderArgs} from '../../../typings/args';
import {cancelOrder} from './cancelOrder';

/**
 *
 * Use with [[ApiComposer]] and belongs to [[AssetApi.cancelBidOrder]].
 *
 * See details at [[AssetApi.cancelBidOrder]]
 * @module core.api.factories
 *
 */
export const cancelBidOrder = (service: ChainService) =>
    async (args: CancelOrderArgs) =>
        cancelOrder(service)({
            type: 'bid',
            ...args,
        });
