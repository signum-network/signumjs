import {DefaultSendArgs} from './defaultSendArgs';

/**
 * The argument object for [[AccountApi.setRewardRecipient]]
 *
 * @param recipientId The recipients id, i.e. pool address
 * @module core
 */
export interface SetRewardRecipientArgs extends DefaultSendArgs {
    recipientId: string;
}


