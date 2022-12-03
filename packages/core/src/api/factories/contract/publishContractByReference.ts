/**
 * Copyright (c) 2021,2022 Signum Network
 */
import {ChainService} from '../../../service';
import {UnsignedTransaction} from '../../../typings/unsignedTransaction';
import {DefaultDeadline} from '../../../constants';
import {PublishContractByReferenceArgs} from '../../../typings/args';
import {signIfPrivateKey} from '../../../internal/signIfPrivateKey';
import {generateDataStack} from '@signumjs/contracts/out/generateDataStack';
import {calculateMinimumCreationFee} from '@signumjs/contracts';


/**
 * Use with [[ApiComposer]] and belongs to [[ContractApi]].
 *
 * See details at [[ContractApi.publishContractByReference]]
 * @module core.api.factories
 */
export const publishContractByReference = (service: ChainService) =>
    (args: PublishContractByReferenceArgs) =>
        signIfPrivateKey(service, args, async (a: PublishContractByReferenceArgs) => {

            const {dataHex} = generateDataStack(a.data || []);
            const feeNQT = a.feePlanck || calculateMinimumCreationFee({
                dataHex,
            }).getPlanck();

            const parameters = {
                deadline: a.deadline || DefaultDeadline,
                description: a.description,
                feeNQT,
                referencedTransactionFullHash: a.referencedTransactionHash,
                name: a.name,
                publicKey: a.senderPublicKey,
                data: dataHex || undefined,
                broadcast: true,
            };

            return service.send<UnsignedTransaction>('createATProgram', parameters);
        });
