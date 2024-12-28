/**
 * Copyright (c) 2019 Burst Apps Team
 */
import { ChainService } from '../../../service/chainService';
import { Peer } from '../../../typings/peer';

/**
 * Use with {@link ApiComposer} and belongs to {@link NetworkApi}.
 *
 * See details at {@link NetworkApi.getPeer}
*
* @category factories
*/
export const getPeer = (service: ChainService):
    (peer: string) => Promise<Peer> =>
    (peer: string): Promise<Peer> =>
        service.query('getPeer', {
            peer,
        });
