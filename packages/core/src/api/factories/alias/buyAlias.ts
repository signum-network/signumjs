/**
 * Copyright (c) 2019 Burst Apps Team
 * Modified (c) 2022 Signum Network
 */
import {ChainService} from '../../../service/chainService';
import {UnsignedTransaction} from '../../../typings/unsignedTransaction';
import {signIfPrivateKey} from '../../../internal/signIfPrivateKey';
import {DefaultDeadline} from '../../../constants';
import { BuyAliasArgs } from '../../../typings/args';

/**
 * Use with {@link ApiComposer} and belongs to {@link AliasApi}.
 *
 * See details at {@link AliasApi.buyAlias}
*
* @category factories
*/
export const buyAlias = (service: ChainService) =>  (args: BuyAliasArgs) => signIfPrivateKey(service, args,
    async (a: BuyAliasArgs) => {

        const parameters = {
            aliasName: a.aliasName,
            alias: a.aliasId,
            deadline: a.deadline || DefaultDeadline,
            feeNQT: a.feePlanck,
            amountNQT: a.amountPlanck,
            publicKey: a.senderPublicKey,
            referencedTransactionFullHash: a.referencedTransactionFullHash,
        };
        return  service.send<UnsignedTransaction>('buyAlias', parameters);

    });
