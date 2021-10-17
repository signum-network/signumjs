/**
 * Original work Copyright (c) 2021 Signum Network
 */
import {ChainService} from '../../../service/chainService';
import {MiningInfo} from '../../../typings/miningInfo';


/**
 * Use with [[ApiComposer]] and belongs to [[NetworkApi]].
 *
 * See details at [[NetworkApi.getMiningInfo]]
 * @module core.api.factories
 */
export const getMiningInfo = (service: ChainService): () => Promise<MiningInfo> =>
    (): Promise<MiningInfo> => service.query('getMiningInfo');
