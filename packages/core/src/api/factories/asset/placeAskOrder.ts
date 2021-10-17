/**
 * Copyright (c) 2020 Burst Apps Team
 */
import {ChainService} from '../../../service/chainService';
import {TransactionId} from '../../../typings/transactionId';
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
export const placeAskOrder = (service: ChainService):
    (args: PlaceOrderArgs) => Promise<TransactionId> =>
    async (args: PlaceOrderArgs): Promise<TransactionId> => {

        return placeOrder(service)({
            type: 'ask',
            ...args,
        });

    };
