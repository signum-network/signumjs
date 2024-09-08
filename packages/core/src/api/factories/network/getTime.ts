/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 */
import {ChainService} from '../../../service/chainService';
import {ChainTimestamp} from '../../../typings/chainTimestamp';

/**
 * Use with {@link ApiComposer} and belongs to {@link NetworkApi}.
 *
 * See details at {@link NetworkApi.getTime}
*
* @category factories
*/
export const getTime = (service: ChainService): () => Promise<ChainTimestamp> =>
    async (): Promise<ChainTimestamp> => service.query('getTime');

