/**
 * Copyright (c) 2023 Signum Network
 */
import {ChainService} from '../../../service/chainService';
import {UnsignedTransaction} from '../../../typings/unsignedTransaction';
import {signIfPrivateKey} from '../../../internal/signIfPrivateKey';
import {DefaultDeadline} from '../../../constants';
import {BuyTopLevelDomainArgs} from '../../../typings/args';
import {createParametersFromAttachment} from '../../../internal';

/**
 * Use with {@link ApiComposer} and belongs to {@link AliasApi}.
 *
 * See details at {@link AliasApi.buyTopLevelDomain}
 *
*
* @category factories
*/
export const buyTopLevelDomain = (service: ChainService) =>
    (args: BuyTopLevelDomainArgs) =>
        signIfPrivateKey(service, args, async (a: BuyTopLevelDomainArgs) => {
            let parameters = {
                tld: a.tld,
                amountNQT: a.amountPlanck,
                deadline: a.deadline || DefaultDeadline,
                feeNQT: a.feePlanck,
                publicKey: a.senderPublicKey,
                referencedTransactionFullHash: a.referencedTransactionFullHash,
            };

            if (args.attachment) {
                parameters = createParametersFromAttachment(a.attachment, parameters);
            }
            return service.send<UnsignedTransaction>('setTLD', parameters);
        });
