/**
 * Copyright (c) 2019 Burst Apps Team
 */
import {ChainService} from '../../../service/chainService';
import {TransactionId} from '../../../typings/transactionId';
import {TransactionResponse} from '../../../typings/transactionResponse';
import {DefaultDeadline} from '../../../constants';
import {signAndBroadcastTransaction} from './signAndBroadcastTransaction';
import {createParametersFromAttachment} from '../../../internal/createParametersFromAttachment';
import {SendAmountArgs} from '../../../typings/args/sendAmountArgs';

const SmartContractPublickey = '0000000000000000000000000000000000000000000000000000000000000000';

/**
 * Use with [[ApiComposer]] and belongs to [[TransactionApi]].
 *
 * See details at [[TransactionApi.sendAmountToSingleRecipient]]
 * @module core.api.factories
 */
export const sendAmountToSingleRecipient = (service: ChainService):
    (args: SendAmountArgs) => Promise<TransactionId> =>
    async (args: SendAmountArgs): Promise<TransactionId> => {

        let recipientPublicKey = args.recipientPublicKey || undefined;
        if (args.recipientPublicKey && args.recipientPublicKey === SmartContractPublickey) {
            recipientPublicKey = undefined;
        }

        let parameters = {
            amountNQT: args.amountPlanck,
            publicKey: args.senderPublicKey,
            recipient: args.recipientId,
            recipientPublicKey,
            feeNQT: args.feePlanck,
            deadline: args.deadline || DefaultDeadline
        };

        if (args.attachment) {
            parameters = createParametersFromAttachment(args.attachment, parameters);
        }

        const {unsignedTransactionBytes: unsignedHexMessage} = await service.send<TransactionResponse>('sendMoney', parameters);

        return signAndBroadcastTransaction(service)({
            senderPublicKey: args.senderPublicKey,
            senderPrivateKey: args.senderPrivateKey,
            unsignedHexMessage
        });

    };
