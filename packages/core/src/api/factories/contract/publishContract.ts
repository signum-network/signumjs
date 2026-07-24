/**
 * Copyright (c) 2019 Burst Apps Team
 * Modified (c) 2026 Signum Network
 */
import {generateDataStack} from '@signumjs/contracts';
import {ChainService} from '../../../service';
import {PublishContractArgs} from '../../../typings/args';
import {UnsignedTransaction} from '../../../typings/unsignedTransaction';
import {DefaultDeadline} from '../../../constants';
import {signIfPrivateKey} from '../../../internal/signIfPrivateKey';


/**
 * Use with {@link ApiComposer} and belongs to {@link ContractApi}.
 *
 * See details at {@link ContractApi.publishContract}
*
* @category factories
*/
export const publishContract = (service: ChainService) =>
    (args: PublishContractArgs) => signIfPrivateKey(service, args, async (a: PublishContractArgs) => {

        const dataHex = generateDataStack(a.data || []);

        const parameters = {
            code: a.codeHex,
            deadline: a.deadline || DefaultDeadline,
            description: a.description,
            feeNQT: a.feePlanck,
            minActivationAmountNQT: a.activationAmountPlanck,
            name: a.name,
            publicKey: a.senderPublicKey,
            data: dataHex || undefined,
            dpages: a.dataPages,
            cspages: a.callStackPages,
            uspages: a.userStackPages,
            broadcast: true,
        };

        return service.send<UnsignedTransaction>('createATProgram', parameters);
    });
