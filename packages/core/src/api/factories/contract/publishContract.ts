/**
 * Copyright (c) 2019 Burst Apps Team
 */
import {calculateMinimumCreationFee} from '@signumjs/contracts';
import {ChainService} from '../../../service';
import {PublishContractArgs} from '../../../typings/args';
import {signAndBroadcastTransaction} from '../transaction';
import {TransactionId} from '../../../typings/transactionId';
import {UnsignedTransaction} from '../../../typings/unsignedTransaction';
import {DefaultDeadline} from '../../../constants';


/**
 * Use with [[ApiComposer]] and belongs to [[ContractApi]].
 *
 * See details at [[ContractApi.publishContract]]
 * @module core.api.factories
 */
export const publishContract = (service: ChainService):
    (args: PublishContractArgs) => Promise<TransactionId> =>
    async (args: PublishContractArgs): Promise<TransactionId> => {

        const parameters = {
            code: args.codeHex,
            deadline: args.deadline || DefaultDeadline,
            description: args.description,
            feeNQT: calculateMinimumCreationFee(args.codeHex).getPlanck(),
            minActivationAmountNQT: args.activationAmountPlanck,
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
