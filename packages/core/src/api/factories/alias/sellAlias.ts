/**
 * Copyright (c) 2019 Burst Apps Team
 * Modified (c) 2022 Signum Network
 */
import {ChainService} from '../../../service/chainService';
import {UnsignedTransaction} from '../../../typings/unsignedTransaction';
import {signIfPrivateKey} from '../../../internal/signIfPrivateKey';
import {DefaultDeadline} from '../../../constants';
import {SellAliasArgs} from '../../../typings/args';

/**
 * Use with {@link ApiComposer} and belongs to {@link AliasApi}.
 *
 * See details at {@link AliasApi.buyAlias}
*
* @category factories
*/
export const sellAlias = (service: ChainService) =>  (args: SellAliasArgs) => signIfPrivateKey(service, args,
    async (a: SellAliasArgs) => {

        const parameters = {
            aliasName: a.aliasName,
            alias: a.aliasId,
            deadline: a.deadline || DefaultDeadline,
            feeNQT: a.feePlanck,
            publicKey: a.senderPublicKey,
            priceNQT: a.amountPlanck,
            referencedTransactionFullHash: a.referencedTransactionFullHash,
            recipient: a.recipientId,
            recipientPublicKey: a.recipientPublicKey,
        };
        return  service.send<UnsignedTransaction>('sellAlias', parameters);

    });
