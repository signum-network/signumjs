/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 */
import {ChainService} from '../../../service/chainService';
import {BlockchainStatus} from '../../../typings/blockchainStatus';


/**
 * Use with {@link ApiComposer} and belongs to {@link NetworkApi}.
 *
 * See details at {@link NetworkApi.getBlockchainStatus}
*
* @category factories
*/
export const getBlockchainStatus = (service: ChainService): () => Promise<BlockchainStatus> =>
    (): Promise<BlockchainStatus> => service.query('getBlockchainStatus');
