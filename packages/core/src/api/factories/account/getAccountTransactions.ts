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

        if (args.resolveDistributions) {
            parameters.includeIndirect = true;
        }

        delete parameters.accountId;
        delete parameters.resolveDistributions;

        const result = await service.query<TransactionList>('getAccountTransactions', parameters);

        if (!args.resolveDistributions || !parameters.includeIndirect) {
            return result;
        }

        const distributions = result
            .transactions
            .filter(({
                         type,
                         subtype,
                         sender,
                     }) => (
                type === TransactionType.Asset
                && subtype === TransactionAssetSubtype.AssetDistributeToHolders
                && args.accountId !== sender
                )
            )
            .map(tx => getDistributionAmountsFromTransaction(service)(tx.transaction, args.accountId));

        try {
            const resolvedDistributions = await Promise.all(distributions);
            for (const dtx of resolvedDistributions) {
                const tx = result.transactions.find(({transaction}) => transaction === dtx.transaction);
                const {asset, assetToDistribute} = tx.attachment;
                tx.distribution = {
                    assetId: asset,
                    distributedAssetId: assetToDistribute && assetToDistribute !== '0' ? assetToDistribute : null,
                    ...dtx
                };
                if (tx.sender !== args.accountId) {
                    tx.amountNQT = dtx.amountNQT;
                }
            }
        } catch (_) {
            // ignore  silently
        }

        return result;

    };
