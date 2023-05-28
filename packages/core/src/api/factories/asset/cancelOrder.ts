/**
 * Copyright (c) 2020 Burst Apps Team
 * Modified (c) 2022 Signum Network
 */
import {ChainService} from '../../../service/chainService';
import {UnsignedTransaction} from '../../../typings/unsignedTransaction';
import {DefaultDeadline} from '../../../constants';
import {createParametersFromAttachment} from '../../../internal/createParametersFromAttachment';
import {CancelOrderArgs} from '../../../typings/args';
import {signIfPrivateKey} from '../../../internal/signIfPrivateKey';

interface GenericCancelOrderArgs extends CancelOrderArgs {
    type: 'bid' | 'ask';
}

/**
 * @ignore
 * This is an internal helper
 * See details at [[AssetApi.cancelAskOrder]] [[AssetApi.cancelBidOrder]]
 * @module core.api.factories
 */
export const cancelOrder = (service: ChainService) =>
    (args: GenericCancelOrderArgs) => signIfPrivateKey(service, args, async (a: GenericCancelOrderArgs) => {

        let parameters = {
            order: a.order,
            publicKey: a.senderPublicKey,
            feeNQT: a.feePlanck,
            deadline: a.deadline || DefaultDeadline,
            referencedTransactionFullHash: a.referencedTransactionFullHash || undefined
        };

        if (a.attachment) {
            parameters = createParametersFromAttachment(a.attachment, parameters);
        }

        const method = a.type === 'ask' ? 'cancelAskOrder' : 'cancelBidOrder';
        return service.send<UnsignedTransaction>(method, parameters);

    });
