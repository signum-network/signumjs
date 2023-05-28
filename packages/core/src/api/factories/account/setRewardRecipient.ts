/**
 * Copyright (c) 2020 Burst Apps Team
 * Copyright (c) 2022 Signum Network
 */
import {ChainService} from '../../../service/chainService';
import {UnsignedTransaction} from '../../../typings/unsignedTransaction';
import {SetRewardRecipientArgs} from '../../../typings/args/setRewardRecipientArgs';
import {DefaultDeadline} from '../../../constants';
import {signIfPrivateKey} from '../../../internal/signIfPrivateKey';

/**
 * Use with [[ApiComposer]] and belongs to [[AccountApi]].
 *
 * See details at [[AccountApi.setRewardRecipient]]
 * @module core.api.factories
 */
export const setRewardRecipient = (service: ChainService) =>
    (args: SetRewardRecipientArgs) =>
        signIfPrivateKey(service, args, async (a: SetRewardRecipientArgs) => {
                const parameters = {
                    publicKey: a.senderPublicKey,
                    recipient: a.recipientId,
                    feeNQT: a.feePlanck,
                    deadline: a.deadline || DefaultDeadline,
                    referencedTransactionFullHash: a.referencedTransactionFullHash || undefined
                };
                return service.send<UnsignedTransaction>('setRewardRecipient', parameters);
            }
        );
