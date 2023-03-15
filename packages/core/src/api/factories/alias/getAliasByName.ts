/**
 * Copyright (c) 2019 Burst Apps Team
 * Modified (c) 2023 Signum Network
 */
import {ChainService} from '../../../service/chainService';
import {AliasList} from '../../../typings/aliasList';

/**
 * Use with [[ApiComposer]] and belongs to [[AliasApi]].
 *
 * See details at [[AliasApi.getAliasByName]]
 * @module core.api.factories
 */
export const getAliasByName = (service: ChainService):
    (aliasName: string, tld?: string) => Promise<AliasList> =>
    (aliasName: string, tld?: string): Promise<AliasList> => service.query('getAlias', {
        aliasName,
        tld
    });
