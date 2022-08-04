/**
 * Original work Copyright (c) 2021,2022 Signum Network
 */
import {ChainService} from '../../../service/chainService';
import {NetworkInfo} from '../../../typings/networkInfo';


/**
 * Use with [[ApiComposer]] and belongs to [[NetworkApi]].
 *
 * See details at [[NetworkApi.getNetworkInfo]]
 * @module core.api.factories
 */
export const getNetworkInfo = (service: ChainService): () => Promise<NetworkInfo> =>
    (): Promise<NetworkInfo> => service.query('getConstants');
