/**
 * Copyright (c) 2021,2022 Signum Network
 */
import {ChainService} from '../../../service';
import {UnsignedTransaction} from '../../../typings/unsignedTransaction';
import {DefaultDeadline} from '../../../constants';
import {PublishContractByReferenceArgs} from '../../../typings/args';
import {signIfPrivateKey} from '../../../internal/signIfPrivateKey';


/**
 * Use with [[ApiComposer]] and belongs to [[ContractApi]].
 *
 * See details at [[ContractApi.publishContractByReference]]
 * @module core.api.factories
 */
export const publishContractByReference = (service: ChainService) =>
    (args: PublishContractByReferenceArgs) =>
        signIfPrivateKey(service, args, async (a: PublishContractByReferenceArgs) => {

            const parameters = {
                deadline: a.deadline || DefaultDeadline,
                description: a.description,
                feeNQT: a.feePlanck,
                minActivationAmountNQT: a.activationAmountPlanck,
                referencedTransactionFullHash: a.referencedTransaction,
                name: a.name,
                publicKey: a.senderPublicKey,
                cspages: 1,
                dpages: 1,
                uspages: 1,
                broadcast: true,
            };

            return service.send<UnsignedTransaction>('createATProgram', parameters);
        });
