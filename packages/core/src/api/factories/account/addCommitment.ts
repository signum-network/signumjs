/**
 * Copyright (c) 2021 Burst Apps Team
 */
import {ChainService} from '../../../service/chainService';
import {UnsignedTransaction} from '../../../typings/unsignedTransaction';
import {DefaultDeadline} from '../../../constants';
import {CommitmentArgs} from '../../../typings/args/commitmentArgs';
import {signIfPrivateKey} from '../../../internal/signIfPrivateKey';

/**
 * Use with {@link ApiComposer} and belongs to {@link AccountApi}.
 *
 * See details at {@link AccountApi.addCommitment}
*
* @category factories
*/
export const addCommitment = (service: ChainService) =>
    (args: CommitmentArgs) =>
        signIfPrivateKey(service, args,
            async (a: CommitmentArgs) => {
                const parameters = {
                    amountNQT: a.amountPlanck,
                    publicKey: a.senderPublicKey,
                    feeNQT: a.feePlanck,
                    deadline: a.deadline || DefaultDeadline,
                    referencedTransactionFullHash: a.referencedTransactionFullHash || undefined
                };

                return service.send<UnsignedTransaction>('addCommitment', parameters);
            });
