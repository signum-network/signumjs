/**
 * Factory for creating a read-only ledger client
 * @module core
 */

import {ChainService} from '../service';
import {ApiComposer} from '../api/apiComposer';
import {ReadOnlyLedger} from '../typings/ledgerClientTypes';
import {LedgerSettings} from './ledgerClientFactory';

// Import only read operations from factories
import {
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
} from '../api/factories/account';

import {
    getBlockByHeight,
    getBlockById,
    getBlockByTimestamp,
    getBlockId,
    getBlocks,
} from '../api/factories/block';

import {
    getBlockchainStatus,
    getMiningInfo,
    getPeer,
    getPeers,
    getServerStatus,
    getTime,
    getSuggestedFees,
    getNetworkInfo,
} from '../api/factories/network';

import {
    getTransaction,
    getTransactionByFullHash,
    getUnconfirmedTransactions,
    parseTransactionBytes,
    getDistributionAmountsFromTransaction,
    getSubscription,
    getSubscriptionPayments,
} from '../api/factories/transaction';

import {
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
} from '../api/factories/asset';

import {
    getContract,
    getContractsByAccount,
    getAllContractIds,
    getSingleContractMapValue,
    getContractMapValuesByFirstKey,
    getAllContractsByCodeHash,
} from '../api/factories/contract';

import {
    getAliasByName,
    getAliasById,
    getAliasesOnSale,
    getAliases,
    searchAliasesByName,
    getTopLevelDomains,
} from '../api/factories/alias';

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
