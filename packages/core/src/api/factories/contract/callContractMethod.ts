/**
 * Copyright (c) 2019 Burst Apps Team
 * Modified (c) 2022, 2026 Signum Network
 */
import {ChainService} from '../../../service';
import {CallContractMethodArgs} from '../../../typings/args';
import {TransactionId} from '../../../typings/transactionId';
import {AttachmentMessage} from '../../../typings/attachment';
import {sendAmountToSingleRecipient} from '../transaction';
import {generateMethodCall} from '@signumjs/contracts';
import {UnsignedTransaction} from '../../../typings/unsignedTransaction';
import {transferAsset, transferMultipleAssets} from '../asset';
import {DefaultSendArgs} from '../../../typings/args/defaultSendArgs';


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
            methodId: args.methodId,
            methodArgs: args.methodArgs,
        });

        const attachment = new AttachmentMessage({
            message: callMessage,
            messageIsText: false,
        });

        const commonParameters: DefaultSendArgs = {
            deadline: args.deadline,
            senderPublicKey: args.senderPublicKey,
            referencedTransactionFullHash: args.referencedTransactionFullHash,
            feePlanck: args.feePlanck,
            senderPrivateKey: args.senderPrivateKey,
            skipAdditionalSecurityCheck: args.skipAdditionalSecurityCheck
        }

        if(args.assetQuantities?.length === 1){
            return transferAsset(service)({
                amountPlanck: args.amountPlanck,
                assetId: args.assetQuantities[0].assetId,
                quantity: args.assetQuantities[0].quantity,
                recipientId: args.contractId,
                attachment,
                ...commonParameters
            });
        }
        else if(args.assetQuantities?.length > 1 && args.assetQuantities.length <= 4){
            return transferMultipleAssets(service)({
                amountPlanck: args.amountPlanck,
                assetQuantities: args.assetQuantities,
                recipientId: args.contractId,
                attachment,
                ...commonParameters,
            })
        }

        return sendAmountToSingleRecipient(service)({
            amountPlanck: args.amountPlanck,
            attachment,
            recipientId: args.contractId,
            ...commonParameters,
        });

    };
