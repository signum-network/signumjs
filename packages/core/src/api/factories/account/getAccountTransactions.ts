/**
 * Original work Copyright (c) 2019 Burst Apps Team
 * Modified work Copyright (c) 2022 Signum Network
 */
import {ChainService} from '../../../service/chainService';
import {TransactionList} from '../../../typings/transactionList';
import {GetAccountTransactionsArgs} from '../../../typings/args';
import {TransactionAssetSubtype, TransactionType} from '../../../constants';
import {getDistributionAmountsFromTransaction} from '../transaction';

/**
 * Use with [[ApiComposer]] and belongs to [[AccountApi]].
 *
 * See details at [[AccountApi.getAccountTransactions]]
 * @module core.api.factories
 */
export const getAccountTransactions = (service: ChainService):
    (args: GetAccountTransactionsArgs) => Promise<TransactionList> =>
    async (args: GetAccountTransactionsArgs): Promise<TransactionList> => {

        const parameters = {
            ...args,
            account: args.accountId,
        };
        delete parameters.accountId;
        delete parameters.resolveDistributions;

        const result = await service.query<TransactionList>('getAccountTransactions', parameters);

        if (!args.resolveDistributions) {
            return result;
        }

        if (!args.includeIndirect) {
            return result;
        }

        const distributions = result
            .transactions
            .filter(({
                         type,
                         subtype,
                     }) => type === TransactionType.Asset && subtype === TransactionAssetSubtype.AssetDistributeToHolders)
            .map(tx => getDistributionAmountsFromTransaction(service)(tx.transaction, args.accountId));

        const resolvedDistributions = await Promise.all(distributions);

        for (const dtx of resolvedDistributions) {
            const tx = result.transactions.find(({transaction}) => transaction === dtx.transaction);
            const {asset, assetToDistribute} = tx.attachment;
            tx.distribution = {
                assetId: asset,
                distributedAssetId: assetToDistribute && assetToDistribute !== '0' ? assetToDistribute : null,
                ...dtx
            };
            tx.amountNQT = dtx.amountNQT;
        }

        return result;

    };
