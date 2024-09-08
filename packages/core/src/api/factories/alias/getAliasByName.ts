/**
 * Copyright (c) 2019 Burst Apps Team
 * Modified (c) 2023 Signum Network
 */
import {ChainService} from '../../../service/chainService';
import {AliasList} from '../../../typings/aliasList';

/**
 * Use with {@link ApiComposer} and belongs to {@link AliasApi}.
 *
 * See details at {@link AliasApi.getAliasByName}
*
* @category factories
*/
export const getAliasByName = (service: ChainService):
    (aliasName: string, tld?: string) => Promise<AliasList> =>
    (aliasName: string, tld?: string): Promise<AliasList> => service.query('getAlias', {
        aliasName,
        tld
    });
