/**
 * Copyright (c) 2019 Burst Apps Team
 * Modified (c) 2022 Signum Network
 */
import {calculateMinimumCreationFee} from '@signumjs/contracts';
import {ChainService} from '../../../service';
import {PublishContractArgs} from '../../../typings/args';
import {UnsignedTransaction} from '../../../typings/unsignedTransaction';
import {DefaultDeadline} from '../../../constants';
import {signIfPrivateKey} from '../../../internal/signIfPrivateKey';


/**
 * Use with [[ApiComposer]] and belongs to [[ContractApi]].
 *
 * See details at [[ContractApi.publishContract]]
 * @module core.api.factories
 */
export const publishContract = (service: ChainService) =>
    (args: PublishContractArgs) => signIfPrivateKey(service, args, async (a: PublishContractArgs) => {

        if(a.data){

        }

        const parameters = {
            code: a.codeHex,
            deadline: a.deadline || DefaultDeadline,
            description: a.description,
            feeNQT: a.feePlanck || calculateMinimumCreationFee(a.codeHex).getPlanck(),
            minActivationAmountNQT: a.activationAmountPlanck,
            name: a.name,
            publicKey: a.senderPublicKey,
            data: a.data || undefined,
            cspages: 1,
            dpages: 1,
            uspages: 1,
            broadcast: true,
        };

        return service.send<UnsignedTransaction>('createATProgram', parameters);
    });
