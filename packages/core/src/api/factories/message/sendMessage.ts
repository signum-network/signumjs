/**
 * Copyright (c) 2019 Burst Apps Team
 * Modified (c) 2022 Signum Network
 */
import {ChainService} from '../../../service/chainService';
import {UnsignedTransaction} from '../../../typings/unsignedTransaction';
import {DefaultDeadline} from '../../../constants';
import {SendMessageArgs} from '../../../typings/args';
import {signIfPrivateKey} from '../../../internal/signIfPrivateKey';

/**
 * Use with {@link ApiComposer} and belongs to {@link MessageApi}.
 *
 * See details at {@link MessageApi.sendMessage}
*
* @category factories
*/
export const sendMessage = (service: ChainService) =>
    (args: SendMessageArgs) =>
        signIfPrivateKey(service, args, async (a: SendMessageArgs) => {
                const parameters = {
                    message: a.message,
                    publicKey: a.senderPublicKey,
                    recipient: a.recipientId,
                    recipientPublicKey: a.recipientPublicKey || undefined,
                    feeNQT: a.feePlanck,
                    deadline: a.deadline || DefaultDeadline,
                    messageIsText: a.messageIsText !== false,
                    broadcast: true,
                    referencedTransactionFullHash: a.referencedTransactionFullHash || undefined
                };
                return service.send<UnsignedTransaction>('sendMessage', parameters);
            }
        );
