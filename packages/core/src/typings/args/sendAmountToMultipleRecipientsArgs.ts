import {DefaultSendArgs} from './defaultSendArgs';
import {MultioutRecipientAmount} from '../multioutRecipientAmount';

/**
 * The argument object for [[TransactionApi.sendAmountToMultipleRecipients]]
 *
 * @param recipientAmounts The list of recipients and their respective amounts
 * @throws if have duplicate recipient Ids in recipientAmounts
 * @module core
 */
export interface SendAmountToMultipleRecipientsArgs extends DefaultSendArgs {
    recipientAmounts: MultioutRecipientAmount[];
    dedupe?: boolean;
}
