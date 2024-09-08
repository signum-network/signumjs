/**
 * Copyright (c) 2020 Burst Apps Team
 */
import {ChainService} from '../../../service';
import {RewardRecipient} from '../../..';

/**
 * Use with {@link ApiComposer} and belongs to {@link AccountApi}.
 *
 * See details at {@link AccountApi.getRewardRecipient}
*
* @category factories
*/
export const getRewardRecipient = (service: ChainService):
    (accountId: string) => Promise<RewardRecipient> =>
    async (accountId: string): Promise<RewardRecipient> => {
        const parameters = {
            account: accountId
        };

        return service.query<RewardRecipient>('getRewardRecipient', parameters);

    };
