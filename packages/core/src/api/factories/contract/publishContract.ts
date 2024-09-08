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
import {generateDataStack} from '@signumjs/contracts/out/generateDataStack';


/**
 * Use with {@link ApiComposer} and belongs to {@link ContractApi}.
 *
 * See details at {@link ContractApi.publishContract}
*
* @category factories
*/
export const publishContract = (service: ChainService) =>
    (args: PublishContractArgs) => signIfPrivateKey(service, args, async (a: PublishContractArgs) => {

        const {dataHex, dataPageCount} = generateDataStack(a.data || []);
        const feeNQT = a.feePlanck || calculateMinimumCreationFee({
            dataHex,
            codeHex: a.codeHex
        }).getPlanck();

        const parameters = {
            code: a.codeHex,
            deadline: a.deadline || DefaultDeadline,
            description: a.description,
            feeNQT,
            minActivationAmountNQT: a.activationAmountPlanck,
            name: a.name,
            publicKey: a.senderPublicKey,
            data: dataHex || undefined,
            dpages: dataPageCount || 1,
            cspages: 1,
            uspages: 1,
            broadcast: true,
        };

        return service.send<UnsignedTransaction>('createATProgram', parameters);
    });
