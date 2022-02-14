/**
 * Original work Copyright (c) 2021,2022 Signum Network
 */
import {ChainService} from '../../../service/chainService';
import {MiningInfo} from '../../../typings/miningInfo';


/**
 * Use with [[ApiComposer]] and belongs to [[NetworkApi]].
 *
 * See details at [[NetworkApi.getNetworkInfo]]
 * @module core.api.factories
 */
export const getNetworkInfo = (service: ChainService): () => Promise<MiningInfo> =>
    (): Promise<MiningInfo> => service.query('getConstants');
