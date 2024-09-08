/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 */
import {ChainService} from '../../../service/chainService';
import {Block} from '../../../typings/block';


/**
 * Use with {@link ApiComposer} and belongs to {@link BlockApi}.
 *
 * See details at {@link BlockApi.getBlockById}
*
* @category factories
*/
export const getBlockById = (service: ChainService):
    (block: string, includeTransactions: boolean) => Promise<Block> =>
    (block: string, includeTransactions: boolean): Promise<Block> =>
        service.query('getBlock', {
            block,
            includeTransactions
        });
