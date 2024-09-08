import {DefaultSendArgs} from './defaultSendArgs';

/**
 * The argument object for {@link TransactionApi.sendSameAmountToMultipleRecipients}
 *
 * @param recipientIds The list of recipient Ids
 * @param amountPlanck The amount to be sent to all recipients
 * @param dedupe Automatically removes duplicate recipient ids. Default is false, which will throw an error then.
*
* @category args
*/
export interface SendSameAmountToMultipleRecipientsArgs extends DefaultSendArgs {
    recipientIds: string[];
    amountPlanck: string;
    dedupe?: boolean;
}
