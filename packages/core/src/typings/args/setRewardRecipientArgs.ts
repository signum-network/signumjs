import {DefaultSendArgs} from './defaultSendArgs';

/**
 * The argument object for {@link AccountApi.setRewardRecipient}
 *
 * @param recipientId The recipients id, i.e. pool address
*
* @category args
*/
export interface SetRewardRecipientArgs extends DefaultSendArgs {
    recipientId: string;
}


