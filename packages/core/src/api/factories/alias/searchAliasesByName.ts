/**
 * Copyright (c) 2019 Burst Apps Team
 * Modified (c) 2023 Signum Network
 */
import {ChainService} from '../../../service/chainService';
import {AliasList} from '../../../typings/aliasList';
import { SearchAliasesByNameArgs } from '../../../typings/args/searchAliasesByNameArgs';

/**
 * Use with [[ApiComposer]] and belongs to [[AliasApi]].
 *
 * See details at [[AliasApi.searchAliasesByName]]
 * @module core.api.factories
 */
export const searchAliasesByName = (service: ChainService):
    (args: SearchAliasesByNameArgs) => Promise<AliasList> =>
    (args): Promise<AliasList> => service.query('getAliasesByName', args);
