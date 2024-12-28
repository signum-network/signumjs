/**
 * Copyright (c) 2020 Burst Apps Team
 * Modified (c) 2022 Signum Network
 */
import {ChainService} from '../../../service/chainService';
import {UnsignedTransaction} from '../../../typings/unsignedTransaction';
import {DefaultDeadline} from '../../../constants';
import {createParametersFromAttachment} from '../../../internal/createParametersFromAttachment';
import {CreateSubscriptionArgs} from '../../../typings/args';
import {signIfPrivateKey} from '../../../internal/signIfPrivateKey';

/**
 * Use with {@link ApiComposer} and belongs to {@link TransactionApi}.
 *
 * See details at {@link TransactionApi.createSubscription}
*
* @category factories
*/
export const createSubscription = (service: ChainService) =>
    (args: CreateSubscriptionArgs) => signIfPrivateKey(service, args,
        async (a: CreateSubscriptionArgs) => {

            let parameters = {
                amountNQT: a.amountPlanck,
                frequency: a.frequency,
                publicKey: a.senderPublicKey,
                recipient: a.recipientId,
                recipientPublicKey: a.recipientPublicKey || undefined,
                feeNQT: a.feePlanck,
                deadline: a.deadline || DefaultDeadline,
                referencedTransactionFullHash: a.referencedTransactionFullHash,
            };

            if (a.attachment) {
                parameters = createParametersFromAttachment(a.attachment, parameters);
            }

            return service.send<UnsignedTransaction>('sendMoneySubscription', parameters);
        }
    );
