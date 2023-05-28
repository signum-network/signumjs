/**
 * Copyright (c) 2019 Burst Apps Team
 */
import {ChainService} from '../../../service/chainService';
import {UnsignedTransaction} from '../../../typings/unsignedTransaction';
import {DefaultDeadline} from '../../../constants';
import {encryptMessage} from '@signumjs/crypto';
import {SendEncryptedMessageArgs} from '../../../typings/args/sendEncryptedMessageArgs';
import {signIfPrivateKey} from '../../../internal/signIfPrivateKey';

const MAX_MESSAGE_LENGTH = 1024;

/**
 * Use with [[ApiComposer]] and belongs to [[MessageApi]].
 *
 * See details at [[MessageApi.sendEncryptedMessage]]
 * @module core.api.factories
 */
export const sendEncryptedMessage = (service: ChainService) =>
    (args: SendEncryptedMessageArgs) =>
        signIfPrivateKey(service, args, async (a: SendEncryptedMessageArgs) => {

                const encryptedMessage = encryptMessage(a.message, a.recipientPublicKey, a.senderAgreementKey);

                if (encryptedMessage.data.length > MAX_MESSAGE_LENGTH) {
                    throw new Error(`The encrypted message exceeds allowed limit of ${MAX_MESSAGE_LENGTH} bytes`);
                }

                const parameters = {
                    deadline: a.deadline || DefaultDeadline,
                    encryptedMessageData: encryptedMessage.data,
                    encryptedMessageNonce: encryptedMessage.nonce,
                    feeNQT: a.feePlanck,
                    messageToEncryptIsText: a.messageIsText === undefined ? true : a.messageIsText,
                    publicKey: a.senderPublicKey,
                    recipient: a.recipientId,
                    recipientPublicKey: a.recipientPublicKey || undefined,
                    referencedTransactionFullHash: a.referencedTransactionFullHash || undefined
                };

                return service.send<UnsignedTransaction>('sendMessage', parameters);
            }
        );
