/**
 * Copyright (c) 2019 Burst Apps Team
 */
import { ChainService } from '../../../service/chainService';
import { PeerAddressList } from '../../../typings/peerAddressList';

/**
 * Use with {@link ApiComposer} and belongs to {@link NetworkApi}.
 *
 * See details at {@link NetworkApi.getPeers}
*
* @category factories
*/
export const getPeers = (service: ChainService):
    (active: boolean) => Promise<PeerAddressList> =>
    (active: boolean = true): Promise<PeerAddressList> =>
        service.query('getPeers', {
            active,
        });
