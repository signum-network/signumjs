/**
 * Copyright (c) 2019 Burst Apps Team
 * Modified work Copyright (c) 2022 Signum Network
 */
import {ChainService} from '../../../service/chainService';
import {AliasList} from '../../../typings/aliasList';
import {GetAliasesArgs} from '../../../typings/args/getAliasesArgs';

/**
 * Use with [[ApiComposer]] and belongs to [[AccountApi]].
 *
 * See details at [[AccountApi.getAliases]]
 * @module core.api.factories
 */
export const getAliases = (service: ChainService):
    (args: GetAliasesArgs) => Promise<AliasList> =>
    (args: GetAliasesArgs): Promise<AliasList> => service.query('getAliases', {
        account: args.accountId,
        timestamp: args.timestamp,
        firstIndex: args.firstIndex,
        lastIndex: args.lastIndex
    });
