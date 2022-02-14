import {TransactionId} from '../transactionId';
import {SendMessageArgs} from '../args';
import {SendEncryptedMessageArgs} from '../args/sendEncryptedMessageArgs';
import {UnsignedTransaction} from '../unsignedTransaction';

/**
 * The Message API
 * @module core.api
 */
export interface MessageApi {

    /**
     * Sends a plain text message to another account/recipient
     *
     * @param args The argument object
     * @return The Transaction Id or Unsigned Bytes as Hex String if no private key was sent
     */
    sendMessage: (args: SendMessageArgs) => Promise<TransactionId | UnsignedTransaction>;

    /**
     * Sends an encrypted text message to another account/recipient
     *
     * @param args The argument object
     * @return The Transaction Id or Unsigned Bytes as Hex String if no private key was sent
     */
    sendEncryptedMessage: (args: SendEncryptedMessageArgs) => Promise<TransactionId | UnsignedTransaction>;
}
