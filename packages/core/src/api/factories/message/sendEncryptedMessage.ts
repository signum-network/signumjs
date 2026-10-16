/**
 * Copyright (c) 2019 Burst Apps Team
 */
import {encryptMessage} from '@signumjs/crypto/encryption';
import {ChainService} from '../../../service/chainService';
import {UnsignedTransaction} from '../../../typings/unsignedTransaction';
import {DefaultDeadline} from '../../../constants';
import {SendEncryptedMessageArgs} from '../../../typings/args/sendEncryptedMessageArgs';
import {signIfPrivateKey} from '../../../internal/signIfPrivateKey';

/**
 * Use with {@link ApiComposer} and belongs to {@link MessageApi}.
 *
 * See details at {@link MessageApi.sendEncryptedMessage}
*
* @category factories
*/
export const sendEncryptedMessage = (service: ChainService) =>
    (args: SendEncryptedMessageArgs) =>
        signIfPrivateKey(service, args, async (a: SendEncryptedMessageArgs) => {

                // The size limit is enforced by the node (see `maxArbitraryMessageLength` in `getConstants`).
                // `encryptedMessage.data` is hex, so a client-side length check on it would be off by factor two.
                const encryptedMessage = await encryptMessage(a.message, a.recipientPublicKey, a.senderAgreementKey);

                const parameters = {
                    deadline: a.deadline || DefaultDeadline,
                    encryptedMessageData: encryptedMessage.data,
                    encryptedMessageNonce: encryptedMessage.nonce,
                    feeNQT: a.feePlanck,
                    messageToEncryptIsText: a.messageIsText === undefined ? true : a.messageIsText,
                    publicKey: a.senderPublicKey,
                    recipient: a.recipientId,
                    recipientPublicKey: a.recipientPublicKey || undefined,
                    referencedTransactionFullHash: a.referencedTransactionFullHash || undefined,
                    skipAdditionalSecurityCheck: a.skipAdditionalSecurityCheck
                };

                return service.send<UnsignedTransaction>('sendMessage', parameters);
            }
        );
