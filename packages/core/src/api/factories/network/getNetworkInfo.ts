/**
 * Original work Copyright (c) 2021,2022 Signum Network
 */
import {ChainService} from '../../../service/chainService';
import {NetworkInfo} from '../../../typings/networkInfo';


/**
 * Use with {@link ApiComposer} and belongs to {@link NetworkApi}.
 *
 * See details at {@link NetworkApi.getNetworkInfo}
*
* @category factories
*/
export const getNetworkInfo = (service: ChainService): () => Promise<NetworkInfo> =>
    (): Promise<NetworkInfo> => service.query('getConstants');
