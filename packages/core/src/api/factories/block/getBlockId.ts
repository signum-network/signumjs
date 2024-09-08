/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 */
import {ChainService} from '../../../service/chainService';
import {BlockId} from '../../..';

/**
 * Use with {@link ApiComposer} and belongs to {@link BlockApi}.
 *
 * See details at {@link BlockApi.getBlockId}
*
* @category factories
*/
export const getBlockId = (service: ChainService):
    (height: number) => Promise<BlockId> =>
    (height: number): Promise<BlockId> =>
        service.query('getBlockId', {
            height,
        });
