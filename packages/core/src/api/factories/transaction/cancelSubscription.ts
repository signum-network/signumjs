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
 * Use with {@link ApiComposer} and belongs to {@link TransactionApi}.
 *
 * See details at {@link TransactionApi.cancelSubscription}
*
* @category factories
*/
export const cancelSubscription = (service: ChainService) =>
    (args: CancelSubscriptionArgs) => signIfPrivateKey(service, args,
        async (a: CancelSubscriptionArgs) => {

            let parameters = {
                subscription: a.subscriptionId,
                publicKey: a.senderPublicKey,
                feeNQT: a.feePlanck,
                deadline: a.deadline || DefaultDeadline,
                referencedTransactionFullHash: a.referencedTransactionFullHash || undefined
            };

            if (a.attachment) {
                parameters = createParametersFromAttachment(a.attachment, parameters);
            }

            return service.send<UnsignedTransaction>('subscriptionCancel', parameters);
        });
