import {DefaultSendArgs} from './defaultSendArgs';
import {MultioutRecipientAmount} from '../multioutRecipientAmount';

/**
 * The argument object for {@link TransactionApi.sendAmountToMultipleRecipients}
 *
 * @param recipientAmounts The list of recipients and their respective amounts
 * @throws if have duplicate recipient Ids in recipientAmounts
*
* @category args
*/
export interface SendAmountToMultipleRecipientsArgs extends DefaultSendArgs {
    recipientAmounts: MultioutRecipientAmount[];
}
