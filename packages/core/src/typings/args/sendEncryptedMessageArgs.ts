import {DefaultSendArgs} from './defaultSendArgs';

/**
 * The argument object for [[MessageApi.sendEncryptedMessage]]
 *
 * @param message The message that will be encrypted
 * @param messageIsText Determine whether content is text or binary data. Defaults to true
 * @param recipientId The id of the recipient
 * @param recipientPublicKey The recipients public key in hex format.
 * @param senderAgreementKey The senders agreement key used for encryption
 * @module core
 */
export interface SendEncryptedMessageArgs extends DefaultSendArgs {
    message: string;
    messageIsText?: boolean;
    recipientId: string;
    recipientPublicKey: string;
    senderAgreementKey: string;
}
