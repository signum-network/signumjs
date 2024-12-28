/**
 * Copyright (c) 2023 Signum Network
 */
import {ChainService} from '../../../service/chainService';
import {GetTopLevelDomainsArgs} from '../../../typings/args/getTopLevelDomainsArgs';
import {TopLevelDomainList} from '../../../typings/topLevelDomainList';

/**
 * Use with {@link ApiComposer} and belongs to {@link AliasApi}.
 *
 * See details at {@link AliasApi.getTopLevelDomains}
*
* @category factories
*/
export const getTopLevelDomains = (service: ChainService):
    (args: GetTopLevelDomainsArgs) => Promise<TopLevelDomainList> =>
    (args: GetTopLevelDomainsArgs): Promise<TopLevelDomainList> => service.query('getTLDs', args);
