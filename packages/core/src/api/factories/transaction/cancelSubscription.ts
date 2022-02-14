/**
 * Copyright (c) 2020 Burst Apps Team
 * Modified (c) 2022 Signum Network
 */
import {ChainService} from '../../../service/chainService';
import {UnsignedTransaction} from '../../../typings/unsignedTransaction';
import {DefaultDeadline} from '../../../constants';
import {createParametersFromAttachment} from '../../../internal/createParametersFromAttachment';
import {CancelSubscriptionArgs} from '../../../typings/args/cancelSubscriptionArgs';
import {signIfPrivateKey} from '../../../internal/signIfPrivateKey';

/**
 * Use with [[ApiComposer]] and belongs to [[TransactionApi]].
 *
 * See details at [[TransactionApi.cancelSubscription]]
 * @module core.api.factories
 */
export const cancelSubscription = (service: ChainService) =>
    (args: CancelSubscriptionArgs) => signIfPrivateKey(service, args,
        async (a: CancelSubscriptionArgs) => {

            let parameters = {
                subscription: a.subscriptionId,
                publicKey: a.senderPublicKey,
                feeNQT: a.feePlanck,
                deadline: a.deadline || DefaultDeadline
            };

            if (a.attachment) {
                parameters = createParametersFromAttachment(a.attachment, parameters);
            }

            return service.send<UnsignedTransaction>('subscriptionCancel', parameters);
        });
