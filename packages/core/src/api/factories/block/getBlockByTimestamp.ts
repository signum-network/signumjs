/**
 * Original work Copyright (c) 2019 Burst Apps Team
 */
import {ChainService} from '../../../service/chainService';
import {Block} from '../../../typings/block';

/**
 * Use with {@link ApiComposer} and belongs to {@link BlockApi}.
 *
 * See details at {@link BlockApi.getBlockByTimestamp}
*
* @category factories
*/
export const getBlockByTimestamp = (service: ChainService):
    (timestamp: number, includeTransactions: boolean) => Promise<Block> =>
    (timestamp: number, includeTransactions: boolean): Promise<Block> =>
        service.query('getBlock', {
            timestamp,
            includeTransactions
        });
