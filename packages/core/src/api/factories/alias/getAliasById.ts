/**
 * Copyright (c) 2019 Burst Apps Team
 */
import {ChainService} from '../../../service/chainService';
import {AliasList} from '../../../typings/aliasList';

/**
 * Use with {@link ApiComposer} and belongs to {@link AliasApi}.
 *
 * See details at {@link AliasApi.getAliasById}
*
* @category factories
*/
export const getAliasById = (service: ChainService):
    (aliasId: string) => Promise<AliasList> =>
    (aliasId: string): Promise<AliasList> => service.query('getAlias', {
        alias: aliasId,
    });
