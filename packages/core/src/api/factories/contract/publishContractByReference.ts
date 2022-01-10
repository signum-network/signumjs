/**
 * Copyright (c) 2021 Signum Network
 */
import {ChainService} from '../../../service';
import {signAndBroadcastTransaction} from '../transaction';
import {TransactionId} from '../../../typings/transactionId';
import {UnsignedTransaction} from '../../../typings/unsignedTransaction';
import {DefaultDeadline} from '../../../constants';
import {PublishContractByReferenceArgs} from '../../../typings/args';


/**
 * Use with [[ApiComposer]] and belongs to [[ContractApi]].
 *
 * See details at [[ContractApi.publishContractByReference]]
 * @module core.api.factories
 */
export const publishContractByReference = (service: ChainService):
    (args: PublishContractByReferenceArgs) => Promise<TransactionId> =>
    async (args: PublishContractByReferenceArgs): Promise<TransactionId> => {

        const parameters = {
            deadline: args.deadline || DefaultDeadline,
            description: args.description,
            feeNQT: args.feePlanck,
            minActivationAmountNQT: args.activationAmountPlanck,
            referencedTransactionFullHash: args.referencedTransaction,
            name: args.name,
            publicKey: args.senderPublicKey,
            cspages: 1,
            dpages: 1,
            uspages: 1,
            broadcast: true,
        };

        const {unsignedTransactionBytes: unsignedHexMessage} = await service.send<UnsignedTransaction>('createATProgram', parameters);

        return signAndBroadcastTransaction(service)({
            senderPublicKey: args.senderPublicKey,
            senderPrivateKey: args.senderPrivateKey,
            unsignedHexMessage
        });
    };
