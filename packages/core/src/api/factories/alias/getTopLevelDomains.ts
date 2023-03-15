/**
 * Copyright (c) 2023 Signum Network
 */
import {ChainService} from '../../../service/chainService';
import {GetTopLevelDomainsArgs} from '../../../typings/args/getTopLevelDomainsArgs';
import {TopLevelDomainList} from '../../../typings/topLevelDomainList';

/**
 * Use with [[ApiComposer]] and belongs to [[AliasApi]].
 *
 * See details at [[AliasApi.getTopLevelDomains]]
 * @module core.api.factories
 */
export const getTopLevelDomains = (service: ChainService):
    (args: GetTopLevelDomainsArgs) => Promise<TopLevelDomainList> =>
    (args: GetTopLevelDomainsArgs): Promise<TopLevelDomainList> => service.query('getTLDs', args);
