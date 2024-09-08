/**
 * Copyright (c) 2019 Burst Apps Team
 * Modified (c) 2022 Signum Network
 */
import {ChainService} from '../../../service';
import {CallContractMethodArgs, SendAmountArgs} from '../../../typings/args';
import {TransactionId} from '../../../typings/transactionId';
import {AttachmentMessage} from '../../../typings/attachment';
import {sendAmountToSingleRecipient} from '../transaction';
import {generateMethodCall} from '@signumjs/contracts';
import {UnsignedTransaction} from '../../../typings/unsignedTransaction';


/**
 * Use with {@link ApiComposer} and belongs to {@link ContractApi}.
 *
 * See details at {@link ContractApi.callContractMethod}
*
* @category factories
*/
export const callContractMethod = (service: ChainService) =>
    async (args: CallContractMethodArgs): Promise<TransactionId | UnsignedTransaction> => {

        const callMessage = generateMethodCall({
            methodHash: args.methodHash,
            methodArgs: args.methodArgs,
        });

        const attachment = new AttachmentMessage({
            message: callMessage,
            messageIsText: false,
        });

        const parameters: SendAmountArgs = {
            amountPlanck: args.amountPlanck,
            attachment,
            deadline: args.deadline,
            feePlanck: args.feePlanck,
            recipientId: args.contractId,
            senderPrivateKey: args.senderPrivateKey,
            senderPublicKey: args.senderPublicKey,
            referencedTransactionFullHash: args.referencedTransactionFullHash
        };

        return sendAmountToSingleRecipient(service)(parameters);

    };
