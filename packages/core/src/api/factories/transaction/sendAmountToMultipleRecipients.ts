/**
 * Copyright (c) 2019 Burst Apps Team
 * Modified Work (c) 2022 Signum Network
 */
import {ChainService} from '../../../service/chainService';
import {UnsignedTransaction} from '../../../typings/unsignedTransaction';
import {MultioutRecipientAmount} from '../../../typings/multioutRecipientAmount';
import {SendAmountToMultipleRecipientsArgs} from '../../../typings/args/sendAmountToMultipleRecipientsArgs';
import {signIfPrivateKey} from '../../../internal/signIfPrivateKey';
import {DefaultDeadline} from '../../../constants';

function mountRecipientsString(recipientAmounts: MultioutRecipientAmount[]): string {
    return recipientAmounts.map(({amountNQT, recipient}) => `${recipient}:${amountNQT}`).join(';');
}

function assertDuplicates(recipientAmounts: MultioutRecipientAmount[]) {
    const recipientIds = new Set<string>();
    for (const ra of recipientAmounts) {
        if (recipientIds.has(ra.recipient)) {
            throw new Error('Duplicate Recipients found');
        }
        recipientIds.add(ra.recipient);
    }
}

/**
 * Use with {@link ApiComposer} and belongs to {@link TransactionApi}.
 *
 * See details at {@link TransactionApi.sendAmountToMultipleRecipients}
*
* @category factories
*/
export const sendAmountToMultipleRecipients = (service: ChainService) =>
    (args: SendAmountToMultipleRecipientsArgs) =>
        signIfPrivateKey(service, args, async (a: SendAmountToMultipleRecipientsArgs) => {

                const {recipientAmounts, deadline = DefaultDeadline, feePlanck, senderPublicKey, referencedTransactionFullHash} = a;

                assertDuplicates(recipientAmounts);

                if (recipientAmounts.length === 0) {
                    throw new Error('No recipients given. Send ignored');
                }

                const parameters = {
                    publicKey: senderPublicKey,
                    recipients: mountRecipientsString(recipientAmounts),
                    feeNQT: feePlanck,
                    deadline,
                    referencedTransactionFullHash
                };

                return service.send<UnsignedTransaction>('sendMoneyMulti', parameters);
            }
        );
