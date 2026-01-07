/**
 * Factory for creating a read-only ledger client
 * @module core
 */

import {ChainService} from '../service';
import {ApiComposer} from '../api/apiComposer';
import {ReadOnlyLedger} from '../typings/ledgerClientTypes';
import {LedgerSettings} from './ledgerClientFactory';

// Import only read operations from factories - direct imports to avoid loading write operations
import {getAccount} from '../api/factories/account/getAccount';
import {getAccountBalance} from '../api/factories/account/getAccountBalance';
import {getAccountBlockIds} from '../api/factories/account/getAccountBlockIds';
import {getAccountBlocks} from '../api/factories/account/getAccountBlocks';
import {getAccountSubscriptions} from '../api/factories/account/getAccountSubscriptions';
import {getAccountTransactions} from '../api/factories/account/getAccountTransactions';
import {getAccountTransactionsBetweenSenderAndRecipient} from '../api/factories/account/getAccountTransactionsBetweenSenderAndRecipient';
import {getAccountTransactionsFromSender} from '../api/factories/account/getAccountTransactionsFromSender';
import {getAccountTransactionsFromSenderToRecipient} from '../api/factories/account/getAccountTransactionsFromSenderToRecipient';
import {getAccountTransactionsToRecipient} from '../api/factories/account/getAccountTransactionsToRecipient';
import {getRewardRecipient} from '../api/factories/account/getRewardRecipient';
import {getSubscriptionsToAccount} from '../api/factories/account/getSubscriptionsToAccount';
import {getUnconfirmedAccountTransactions} from '../api/factories/account/getUnconfirmedAccountTransactions';
import {generateSendTransactionQRCode} from '../api/factories/account/generateSendTransactionQRCode';
import {generateSendTransactionQRCodeAddress} from '../api/factories/account/generateSendTransactionQRCodeAddress';

import {getBlockByHeight} from '../api/factories/block/getBlockByHeight';
import {getBlockById} from '../api/factories/block/getBlockById';
import {getBlockByTimestamp} from '../api/factories/block/getBlockByTimestamp';
import {getBlockId} from '../api/factories/block/getBlockId';
import {getBlocks} from '../api/factories/block/getBlocks';

import {getBlockchainStatus} from '../api/factories/network/getBlockchainStatus';
import {getMiningInfo} from '../api/factories/network/getMiningInfo';
import {getPeer} from '../api/factories/network/getPeer';
import {getPeers} from '../api/factories/network/getPeers';
import {getServerStatus} from '../api/factories/network/getServerStatus';
import {getTime} from '../api/factories/network/getTime';
import {getSuggestedFees} from '../api/factories/network/getSuggestedFees';
import {getNetworkInfo} from '../api/factories/network/getNetworkInfo';

// Direct imports to avoid loading signing functions
import {getTransaction} from '../api/factories/transaction/getTransaction';
import {getTransactionByFullHash} from '../api/factories/transaction/getTransactionByFullHash';
import {getUnconfirmedTransactions} from '../api/factories/transaction/getUnconfirmedTransactions';
import {parseTransactionBytes} from '../api/factories/transaction/parseTransactionBytes';
import {getDistributionAmountsFromTransaction} from '../api/factories/transaction/getDistributionAmountsFromTransaction';
import {getSubscription} from '../api/factories/transaction/getSubscription';
import {getSubscriptionPayments} from '../api/factories/transaction/getSubscriptionPayments';

import {getAllAssets} from '../api/factories/asset/getAllAssets';
import {getAsset} from '../api/factories/asset/getAsset';
import {getAssetHolders} from '../api/factories/asset/getAssetHolders';
import {getAssetTransfers} from '../api/factories/asset/getAssetTransfers';
import {getAssetTransfersPerAccount} from '../api/factories/asset/getAssetTransfersPerAccount';
import {getAssetTransfersPerAsset} from '../api/factories/asset/getAssetTransfersPerAsset';
import {getAllTrades} from '../api/factories/asset/getAllTrades';
import {getAssetTrades} from '../api/factories/asset/getAssetTrades';
import {getAssetTradesPerAccount} from '../api/factories/asset/getAssetTradesPerAccount';
import {getAssetTradesPerAsset} from '../api/factories/asset/getAssetTradesPerAsset';
import {getOpenBidOrders} from '../api/factories/asset/getOpenBidOrders';
import {getOpenAskOrders} from '../api/factories/asset/getOpenAskOrders';
import {getOpenBidOrdersPerAsset} from '../api/factories/asset/getOpenBidOrdersPerAsset';
import {getOpenAskOrdersPerAsset} from '../api/factories/asset/getOpenAskOrdersPerAsset';
import {getOpenBidOrdersPerAccount} from '../api/factories/asset/getOpenBidOrdersPerAccount';
import {getOpenAskOrdersPerAccount} from '../api/factories/asset/getOpenAskOrdersPerAccount';
import {getAssetsByIssuer} from '../api/factories/asset/getAssetsByIssuer';
import {getAssetsByName} from '../api/factories/asset/getAssetsByName';
import {getAssetsByOwner} from '../api/factories/asset/getAssetsByOwner';
import {calculateDistributionFee} from '../api/factories/asset/calculateDistributionFee';
import {getTradeHistoryPerAccount} from '../api/factories/asset/getTradeHistoryPerAccount';

import {getContract} from '../api/factories/contract/getContract';
import {getContractsByAccount} from '../api/factories/contract/getContractsByAccount';
import {getAllContractIds} from '../api/factories/contract/getAllContractIds';
import {getSingleContractMapValue} from '../api/factories/contract/getSingleContractMapValue';
import {getContractMapValuesByFirstKey} from '../api/factories/contract/getContractMapValuesByFirstKey';
import {getAllContractsByCodeHash} from '../api/factories/contract/getAllContractsByCodeHash';

import {getAliasByName} from '../api/factories/alias/getAliasByName';
import {getAliasById} from '../api/factories/alias/getAliasById';
import {getAliasesOnSale} from '../api/factories/alias/getAliasesOnSale';
import {getAliases} from '../api/factories/alias/getAliases';
import {searchAliasesByName} from '../api/factories/alias/searchAliasesByName';
import {getTopLevelDomains} from '../api/factories/alias/getTopLevelDomains';

/**
 * Creates a read-only ledger client
 *
 * This client contains only read operations (get*, query*, etc.) and has no crypto dependencies.
 * Use this for dashboards, explorers, monitoring tools, and any application that only needs to read data.
 *
 * Bundle size: Minimal (~5-10 KB + HTTP client)
 *
 * @param settings The ledger settings
 * @returns A read-only ledger client
 *
 * @example
 * ```typescript
 * import {createReadOnlyClient} from '@signumjs/core/createReadOnlyClient';
 *
 * const ledger = createReadOnlyClient({
 *     nodeHost: 'https://europe.signum.network'
 * });
 *
 * const account = await ledger.account.getAccount({accountId: '12345'});
 * const block = await ledger.block.getBlockById({blockId: '1'});
 * ```
 */
export function createReadOnlyClient(settings: LedgerSettings): ReadOnlyLedger {
    const service = new ChainService(settings);

    return ApiComposer
        .create(service)
        .withAccountApi({
            getAccount,
            getAccountBalance,
            getAccountBlockIds,
            getAccountBlocks,
            getAccountSubscriptions,
            getAccountTransactions,
            getAccountTransactionsBetweenSenderAndRecipient,
            getAccountTransactionsFromSender,
            getAccountTransactionsFromSenderToRecipient,
            getAccountTransactionsToRecipient,
            getRewardRecipient,
            getSubscriptionsToAccount,
            getUnconfirmedAccountTransactions,
            generateSendTransactionQRCode,
            generateSendTransactionQRCodeAddress,
        })
        .withBlockApi({
            getBlockByHeight,
            getBlockById,
            getBlockByTimestamp,
            getBlockId,
            getBlocks,
        })
        .withNetworkApi({
            getBlockchainStatus,
            getMiningInfo,
            getPeer,
            getPeers,
            getServerStatus,
            getTime,
            getSuggestedFees,
            getNetworkInfo,
        })
        .withTransactionApi({
            getTransaction,
            getTransactionByFullHash,
            getUnconfirmedTransactions,
            parseTransactionBytes,
            getDistributionAmountsFromTransaction,
            getSubscription,
            getSubscriptionPayments,
        })
        .withAssetApi({
            getAllAssets,
            getAsset,
            getAssetHolders,
            getAssetTransfers,
            getAssetTransfersPerAccount,
            getAssetTransfersPerAsset,
            getAllTrades,
            getAssetTrades,
            getAssetTradesPerAccount,
            getAssetTradesPerAsset,
            getOpenBidOrders,
            getOpenAskOrders,
            getOpenBidOrdersPerAsset,
            getOpenAskOrdersPerAsset,
            getOpenBidOrdersPerAccount,
            getOpenAskOrdersPerAccount,
            getAssetsByIssuer,
            getAssetsByName,
            getAssetsByOwner,
            calculateDistributionFee,
            getTradeHistoryPerAccount,
        })
        .withContractApi({
            getContract,
            getContractsByAccount,
            getAllContractIds,
            getSingleContractMapValue,
            getContractMapValuesByFirstKey,
            getAllContractsByCodeHash,
        })
        .withAliasApi({
            getAliasByName,
            getAliasById,
            getAliasesOnSale,
            getAliases,
            searchAliasesByName,
            getTopLevelDomains,
        })
        .compose() as ReadOnlyLedger;
}
