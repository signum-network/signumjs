/**
 * Copyright (c) 2022 Signum Network
 */
import {ChainService} from '../../../service/chainService';
import {AliasList} from '../../../typings/aliasList';
import {GetAliasesOnSaleArgs} from '../../../typings/args';

/**
 * Use with {@link ApiComposer} and belongs to {@link AliasApi}.
 *
 * See details at {@link AliasApi.getAliasesOnSale}
*
* @category factories
*/
export const getAliasesOnSale = (service: ChainService):
    (args: GetAliasesOnSaleArgs) => Promise<AliasList> =>
    (args: GetAliasesOnSaleArgs): Promise<AliasList> => {

        const params = {
            account: args.accountId,
            buyer: args.buyerId,
            firstIndex: args.firstIndex,
            lastIndex: args.lastIndex,
        };

        return  service.query('getAliasesOnSale', params);
    };
