/**
 * Original work Copyright (c) 2019 Burst Apps Team
 */

import {ChainService} from '../../../service/chainService';
import {Balance} from '../../../typings/balance';

/**
 * Use with {@link ApiComposer} and belongs to {@link AccountApi}.
 *
 * See details at {@link AccountApi.getAccountBalance}
*
* @category factories
*/
export const getAccountBalance = (service: ChainService):
    (accountId: string) => Promise<Balance> =>
    (accountId: string): Promise<Balance> => service.query('getBalance', {
        account: accountId,
    });
