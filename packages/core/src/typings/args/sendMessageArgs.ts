import {DefaultSendArgs} from './defaultSendArgs';


/**
 * The argument object for {@link MessageApi.sendMessage}
 *
 * @param message The message as text to be sent
 * @param messageIsText Defines whether the message is text or another format (hex or base64) (default: `true`)
 * @param recipientId The id of the recipient
 * @param recipientPublicKey The _optional_ recipients public key in hex format.
 * Using this arg allows to activate a recipients account, if not activated yet
*
* @category args
*/
export interface SendMessageArgs extends DefaultSendArgs {
    message: string;
    messageIsText?: boolean;
    recipientId: string;
    recipientPublicKey?: string;
}
