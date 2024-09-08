/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 */
import {ChainService} from '../../../service/chainService';
import {Block} from '../../../typings/block';

/**
 * Use with {@link ApiComposer} and belongs to {@link BlockApi}.
 *
 * See details at {@link BlockApi.getBlockByHeight}
*
* @category factories
*/
export const getBlockByHeight = (service: ChainService):
    (height: number, includeTransactions: boolean) => Promise<Block> =>
    (height: number, includeTransactions: boolean): Promise<Block> =>
        service.query('getBlock', {
            height,
            includeTransactions
        });
