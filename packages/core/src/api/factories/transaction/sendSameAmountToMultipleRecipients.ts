/**
 * Copyright (c) 2019 Burst Apps Team
 * Modified Work (c) 2022 Signum Network
 */
import {ChainService} from '../../../service/chainService';
import {UnsignedTransaction} from '../../../typings/unsignedTransaction';
import {SendSameAmountToMultipleRecipientsArgs} from '../../../typings/args/sendSameAmountToMultipleRecipientsArgs';
import {signIfPrivateKey} from '../../../internal/signIfPrivateKey';
import {DefaultDeadline} from '../../../constants';


/**
 * Use with [[ApiComposer]] and belongs to [[TransactionApi]].
 *
 * See details at [[TransactionApi.sendSameAmountToMultipleRecipients]]
 * @module core.api.factories
 */
export const sendSameAmountToMultipleRecipients = (service: ChainService) =>
    (args: SendSameAmountToMultipleRecipientsArgs) =>
        signIfPrivateKey(service, args,
            async (a: SendSameAmountToMultipleRecipientsArgs) => {

                const {recipientIds, senderPublicKey, amountPlanck, feePlanck,
                    referencedTransactionFullHash,
                    deadline = DefaultDeadline,
                    dedupe = false,
                } = a;

                const uniqueRecipients = new Set<string>(recipientIds);
                if (!dedupe && recipientIds.length !== uniqueRecipients.size) {
                    throw new Error('Duplicate Recipients found');
                }

                if (recipientIds.length === 0) {
                    throw new Error('No recipients given. Send ignored');
                }

                const parameters = {
                    publicKey: senderPublicKey,
                    recipients: Array.from(uniqueRecipients).join(';'),
                    feeNQT: feePlanck,
                    amountNQT: amountPlanck,
                    deadline,
                    referencedTransactionFullHash
                };

                return service.send<UnsignedTransaction>('sendMoneyMultiSame', parameters);
            });
