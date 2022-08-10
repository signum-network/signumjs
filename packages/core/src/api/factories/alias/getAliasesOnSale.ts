/**
 * Copyright (c) 2022 Signum Network
 */
import {ChainService} from '../../../service/chainService';
import {AliasList} from '../../../typings/aliasList';

/**
 * Use with [[ApiComposer]] and belongs to [[AliasApi]].
 *
 * See details at [[AliasApi.getAliasesOnSale]]
 * @module core.api.factories
 */
export const getAliasesOnSale = (service: ChainService):
    (firstIndex?: number, lastIndex?: number) => Promise<AliasList> =>
    (firstIndex?: number, lastIndex?: number): Promise<AliasList> =>
        service.query('getAlias', {firstIndex, lastIndex});
