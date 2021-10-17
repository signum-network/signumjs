/** @ignore */
/** @internal */

import {Attachment, AttachmentEncryptedMessage, AttachmentMessage} from '../typings/attachment';

/**
 * Creates send parameters for a transaction from attachment data
 *
 * @internal
 * @param attachment The attachment
 * @param params Any object
 * @return HttpParams
 * @module core
 */
export const createParametersFromAttachment = (attachment: Attachment, params: any) => {
    if (attachment instanceof AttachmentEncryptedMessage) {
        return {
            encryptedMessageData: attachment.data,
            encryptedMessageNonce: attachment.nonce,
            messageToEncryptIsText: String(attachment.isText),
            ...params
        };
    }

    if (attachment instanceof AttachmentMessage) {
        return {
            message: attachment.message,
            messageIsText: String(attachment.messageIsText),
            ...params
        };
    }

    throw new Error(`Unknown attachment type: ${JSON.stringify(attachment)}`);
};
