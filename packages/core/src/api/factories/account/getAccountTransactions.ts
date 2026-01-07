/**
 * Original work Copyright (c) 2019 Burst Apps Team
 * Modified work Copyright (c) 2022,2024 Signum Network
 */
import {ChainService} from '../../../service/chainService';
import {TransactionList} from '../../../typings/transactionList';
import {GetAccountTransactionsArgs} from '../../../typings/args';
import {TransactionAssetSubtype, TransactionType} from '../../../constants';
// Direct import to avoid loading transaction barrel with write operations
import {getDistributionAmountsFromTransaction} from '../transaction/getDistributionAmountsFromTransaction';

/**
 * Use with {@link ApiComposer} and belongs to {@link AccountApi}.
 *
 * See details at {@link AccountApi.getAccountTransactions}
*
* @category factories
*/
export const getAccountTransactions = (service: ChainService):
    (args: GetAccountTransactionsArgs) => Promise<TransactionList> =>
    async (args: GetAccountTransactionsArgs): Promise<TransactionList> => {

        if(args.senderId || args.recipientId) {
            if(args.accountId){
                throw new Error("Using accountId with recipientId and/or senderId is not allowed")
            }

            if(args.resolveDistributions){
                throw new Error("Using resolveDistributions with recipientId and/or senderId is not allowed")
            }
        }

        const parameters = {
            ...args,
            account: args.accountId || undefined,
            sender: args.senderId,
            recipient: args.recipientId,
            bidirectional: args.bidirectional,
        };

        if (args.resolveDistributions) {
            parameters.includeIndirect = true;
        }

        delete parameters.senderId;
        delete parameters.recipientId;
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
