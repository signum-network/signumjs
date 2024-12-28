/**
 * Copyright (c) 2019 Burst Apps Team
 */
import {ChainService} from '../../../service/chainService';
import {UnsignedTransaction} from '../../../typings/unsignedTransaction';
import {DefaultDeadline} from '../../../constants';
import {createParametersFromAttachment} from '../../../internal/createParametersFromAttachment';
import {SendAmountArgs} from '../../../typings/args/sendAmountArgs';
import {signIfPrivateKey} from '../../../internal/signIfPrivateKey';

const SmartContractPublickey = '0000000000000000000000000000000000000000000000000000000000000000';

/**
 * Use with {@link ApiComposer} and belongs to {@link TransactionApi}.
 *
 * See details at {@link TransactionApi.sendAmountToSingleRecipient}
*
* @category factories
*/
export const sendAmountToSingleRecipient = (service: ChainService) =>
    (args: SendAmountArgs) =>
    signIfPrivateKey(
        service,
        args,
        async (a: SendAmountArgs) => {

        let recipientPublicKey = a.recipientPublicKey || undefined;
        if (recipientPublicKey && recipientPublicKey === SmartContractPublickey) {
            recipientPublicKey = undefined;
        }

        let parameters = {
            amountNQT: a.amountPlanck,
            publicKey: a.senderPublicKey,
            recipient: a.recipientId,
            recipientPublicKey,
            feeNQT: a.feePlanck,
            deadline: a.deadline || DefaultDeadline,
            referencedTransactionFullHash: a.referencedTransactionFullHash
        };

        if (a.attachment) {
            parameters = createParametersFromAttachment(a.attachment, parameters);
        }

        return service.send<UnsignedTransaction>('sendMoney', parameters);
    });
