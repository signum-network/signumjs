/**
 * Copyright (c) 2019 Burst Apps Team
 * Copyright (c) 2022 Signum Network
 */
import {ChainService} from '../../../service/chainService';
import {UnsignedTransaction} from '../../../typings/unsignedTransaction';
import {SetAliasArgs} from '../../../typings/args/setAliasArgs';
import {signIfPrivateKey} from '../../../internal/signIfPrivateKey';
import {DefaultDeadline} from '../../../constants';

/**
 * Use with {@link ApiComposer} and belongs to {@link AccountApi}.
 *
 * See details at {@link AccountApi.setAlias}
 *
*
* @category factories
*/
export const setAlias = (service: ChainService) =>
    (args: SetAliasArgs) =>
        signIfPrivateKey(service, args, async (a: SetAliasArgs) => {
            const parameters = {
                aliasName: a.aliasName,
                aliasURI: a.aliasURI,
                deadline: a.deadline || DefaultDeadline,
                feeNQT: a.feePlanck,
                publicKey: a.senderPublicKey,
                referencedTransactionFullHash: a.referencedTransactionFullHash,
                // omit default tld
                tld: !args.tld || args.tld === 'signum' ?  undefined : args.tld,
            };
            return service.send<UnsignedTransaction>('setAlias', parameters);
        });
