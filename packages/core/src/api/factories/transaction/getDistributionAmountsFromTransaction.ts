/**
 * Original work Copyright (c) 2022 Signum Network
 */
import {ChainService} from '../../../service/chainService';
import {DistributionAmount} from '../../../typings/distributionAmount';

/**
 * Use with {@link ApiComposer} and belongs to {@link TransactionApi}.
 *
 * See details at {@link TransactionApi.getDistributionAmountsFromTransaction}
 * @see also {@link AssetApi.distributeToAssetHolders}
 *
*
* @category factories
*/
export const getDistributionAmountsFromTransaction = (service: ChainService):
    (transactionId: string, accountId: string) => Promise<DistributionAmount> =>
    async (transactionId: string, accountId: string): Promise<DistributionAmount> => {
        const result = await service.query<any>('getIndirectIncoming', {transaction: transactionId, account: accountId});
        return {
            account: accountId,
            transaction: transactionId,
            ...result
        };
    };
