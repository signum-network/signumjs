/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 */
import {ChainService} from '../../../service/chainService';
import {ServerStatus} from '../../../typings/serverStatus';

/**
 * Use with {@link ApiComposer} and belongs to {@link NetworkApi}.
 *
 * See details at {@link NetworkApi.getServerStatus}
*
* @category factories
*/
export const getServerStatus = (service: ChainService): () => Promise<ServerStatus> =>
    (): Promise<ServerStatus> => service.query('getState');
