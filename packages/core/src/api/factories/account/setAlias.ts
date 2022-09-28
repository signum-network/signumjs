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
 * Use with [[ApiComposer]] and belongs to [[AccountApi]].
 *
 * See details at [[AccountApi.setAlias]]
 *
 * @module core.api.factories
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
                referencedTransactionFullHash: a.referencedTransactionFullHash
            };
            return service.send<UnsignedTransaction>('setAlias', parameters);
        });
