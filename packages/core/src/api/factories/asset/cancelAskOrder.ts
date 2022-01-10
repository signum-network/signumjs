/**
 * Copyright (c) 2020 Burst Apps Team
 * Modified (c) 2022 Signum Network
 */
import {ChainService} from '../../../service/chainService';
import {CancelOrderArgs} from '../../../typings/args';
import {cancelOrder} from './cancelOrder';

/**
 *
 * Use with [[ApiComposer]] and belongs to [[AssetApi.cancelAskOrder]].
 *
 * See details at [[AssetApi.cancelAskOrder]]
 * @module core.api.factories
 *
 */
export const cancelAskOrder = (service: ChainService) =>
    async (args: CancelOrderArgs) =>
        cancelOrder(service)({
            type: 'ask',
            ...args,
        });
