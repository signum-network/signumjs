/**
 * Original work Copyright (c) 2021 Signum Network
 */
import {ChainService} from '../../../service/chainService';
import {MiningInfo} from '../../../typings/miningInfo';


/**
 * Use with {@link ApiComposer} and belongs to {@link NetworkApi}.
 *
 * See details at {@link NetworkApi.getMiningInfo}
*
* @category factories
*/
export const getMiningInfo = (service: ChainService): () => Promise<MiningInfo> =>
    (): Promise<MiningInfo> => service.query('getMiningInfo');
