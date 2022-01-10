/**
 * Copyright (c) 2019 Burst Apps Team
 * Modified Work (c) 2022 Signum Network
 */
import {ChainService} from '../../../service/chainService';
import {UnsignedTransaction} from '../../../typings/unsignedTransaction';
import {MultioutRecipientAmount} from '../../../typings/multioutRecipientAmount';
import {SendAmountToMultipleRecipientsArgs} from '../../../typings/args/sendAmountToMultipleRecipientsArgs';
import {signIfPrivateKey} from '../../../internal/signIfPrivateKey';

function mountRecipientsString(recipientAmounts: MultioutRecipientAmount[]): string {
    return recipientAmounts.map(({amountNQT, recipient}) => `${recipient}:${amountNQT}`).join(';');
}

/**
 * Use with [[ApiComposer]] and belongs to [[TransactionApi]].
 *
 * See details at [[TransactionApi.sendAmountToMultipleRecipients]]
 * @module core.api.factories
 */
export const sendAmountToMultipleRecipients = (service: ChainService) =>
    (args: SendAmountToMultipleRecipientsArgs) =>
        signIfPrivateKey(service, args, async (a: SendAmountToMultipleRecipientsArgs) => {

                const {recipientAmounts, deadline, feePlanck, senderPublicKey} = a;

                if (recipientAmounts.length === 0) {
                    throw new Error('No recipients given. Send ignored');
                }

                const parameters = {
                    publicKey: senderPublicKey,
                    recipients: mountRecipientsString(recipientAmounts),
                    feeNQT: feePlanck,
                    deadline
                };

                return service.send<UnsignedTransaction>('sendMoneyMulti', parameters);
            }
        );
