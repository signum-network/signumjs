/**
 * Original work Copyright (c) 2019 Burst Apps Team
 */

import {ChainService} from '../../../service/chainService';
import {Account} from '../../../typings/account';
import {GetAccountArgs} from '../../../typings/args/getAccountArgs';

/**
 * Use with {@link ApiComposer} and belongs to {@link AccountApi}.
 *
 * See details at {@link AccountApi.getAccount}
*
* @category factories
*/
export const getAccount = (service: ChainService):
    (args: GetAccountArgs) => Promise<Account> =>
    (args: GetAccountArgs): Promise<Account> => {

        const params = {
            account: args.accountId,
            height : args.commitmentAtHeight,
            getCommittedAmount : args.includeCommittedAmount,
            estimateCommitment : args.includeEstimatedCommitment
        };

        return service.query('getAccount', params);
    };
