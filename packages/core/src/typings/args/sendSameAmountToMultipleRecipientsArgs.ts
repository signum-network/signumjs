import {DefaultSendArgs} from './defaultSendArgs';

/**
 * The argument object for [[TransactionApi.sendSameAmountToMultipleRecipients]]
 *
 * @param recipientIds The list of recipient Ids
 * @param amountPlanck The amount to be sent to all recipients
 * @module core
 */
export interface SendSameAmountToMultipleRecipientsArgs extends DefaultSendArgs {
    recipientIds: string[];
    amountPlanck: string;
}
