/**
 * Copyright (c) 2019 Burst Apps Team
 * Modified work Copyright (c) 2022 Signum Network
 */
import {ChainService} from '../../../service/chainService';
import {AliasList} from '../../../typings/aliasList';
import {GetAliasesArgs} from '../../../typings/args/getAliasesArgs';

/**
 * Use with {@link ApiComposer} and belongs to {@link AliasApi}.
 *
 * See details at {@link AliasApi.getAliases}
*
* @category factories
*/
export const getAliases = (service: ChainService):
    (args: GetAliasesArgs) => Promise<AliasList> =>
    (args: GetAliasesArgs): Promise<AliasList> => service.query('getAliases', {
        account: args.accountId,
        tld: args.tld,
        aliasName: args.aliasName,
        timestamp: args.timestamp,
        firstIndex: args.firstIndex,
        lastIndex: args.lastIndex,
    });
