/**
 * Copyright (c) 2019 Burst Apps Team
 * Modified (c) 2021,2022,2023 Signum Network
 */
import {ChainService, ChainServiceSettings} from '../service';
import {Api} from '../typings/api';
import {ApiVersion} from '../constants/apiVersion';
import {ApiComposer} from './apiComposer';
import {
    getBlockByHeight,
    getBlockById,
    getBlockByTimestamp,
    getBlockId,
    getBlocks
} from './factories/block';
import {
    getBlockchainStatus,
    getMiningInfo,
    getPeer,
    getPeers,
    getServerStatus,
    getTime,
    getSuggestedFees,
    getNetworkInfo,
} from './factories/network';
import {
    sendEncryptedMessage,
    sendMessage,
} from './factories/message';
import {
    generateSendTransactionQRCode,
    generateSendTransactionQRCodeAddress,
    getAccount,
    getAccountBalance,
    getAccountBlockIds,
    getAccountBlocks,
    getAccountSubscriptions,
    getAccountTransactions,
    getAliases,
    getSubscriptionsToAccount,
    getUnconfirmedAccountTransactions,
    setAccountInfo,
    setAlias,
    setRewardRecipient,
    getRewardRecipient, addCommitment, removeCommitment,
} from './factories/account';
import {
    getAliasById,
    getAliasByName,
    getAliasesOnSale,
    sellAlias,
    buyAlias,
    searchAliasesByName,
    getTopLevelDomains,
    buyTopLevelDomain
} from './factories/alias';
import {
    callContractMethod,
    getAllContractIds,
    getContract, getContractMapValuesByFirstKey,
    getContractsByAccount, getSingleContractMapValue,
    publishContract,
    publishContractByReference
} from './factories/contract';
import {
    broadcastTransaction,
    cancelSubscription,
    createSubscription,
    getTransaction,
    sendAmountToMultipleRecipients,
    sendAmountToSingleRecipient,
    sendSameAmountToMultipleRecipients,
    getSubscription,
    getUnconfirmedTransactions,
    signAndBroadcastTransaction,
    parseTransactionBytes, getDistributionAmountsFromTransaction, getTransactionByFullHash
} from './factories/transaction';
import {
    cancelAskOrder,
    cancelBidOrder,
    getAllAssets,
    getAsset,
    issueAsset,
    placeAskOrder,
    placeBidOrder,
    transferAsset,
    getAssetHolders,
    getAssetTransfers,
    getAssetTransfersPerAccount,
    getAssetTransfersPerAsset,
    addAssetTreasuryAccount,
    distributeToAssetHolders,
    getAllTrades,
    mintAsset,
    getAssetTrades,
    getAssetTradesPerAccount,
    getAssetTradesPerAsset,
    getOpenBidOrders,
    getOpenAskOrders,
    getOpenBidOrdersPerAsset,
    getOpenAskOrdersPerAsset,
    getOpenBidOrdersPerAccount,
    getOpenAskOrdersPerAccount,
    burnAsset,
    getTradeHistoryPerAccount,
    getAssetsByIssuer,
    getAssetsByName,
    transferMultipleAssets,
    transferAssetOwnership,
    calculateDistributionFee, getAssetsByOwner
} from './factories/asset';
import {Http} from '@signumjs/http';
/**
 * Settings for API used in [[composeApi]]
 *
 * @module core.api
 * */
export class ApiSettings {
    /**
     * @param nodeHost {string} The url of the peer/node
     * @param reliableNodeHosts A list of node/peer hosts that can be chosen of,
     * usually a list of reliable/trusted nodes. This is necessary for the automatic node selection.
     * @param httpClientOptions {any} The optional request configuration for the passed Http client
     * @param httpClient {Http} It's possible to add a custom Http client adapter. Default is an Axios based implementation
     * @param apiVersion {ApiVersion} For future usage.
     * The default implementation uses axios. In case of a custom client pass your own options.
     * see [Axios Configuration](https://github.com/axios/axios#request-config)
     */
    constructor(
        public nodeHost: string,
        public reliableNodeHosts?: string[],
        public httpClientOptions?: any,
        public httpClient?: Http,
        public apiVersion?: ApiVersion,
    ) {
    }
}

/**
 * Composes the API, i.e. setup the environment and mounts the API structure
 * with its functions.
 *
 * ```ts
 * const api = composeApi(new ApiSettings('https://europe.signum.network')), // one of the mainnet nodes
 * ```
 *
 * > Note, that this method mounts the __entire__ API, i.e. all available methods. One may also customize the API composition
 * using [[ApiComposer]].
 *
 * @param settings necessary execution context
 * @return The _complete_ API
 *
 * @module core.api
 */
export function composeApi(settings: ApiSettings): Api {

    const serviceSettings: ChainServiceSettings = {...settings};
    const service = new ChainService(serviceSettings);

    return ApiComposer
        .create(service)
        .withBlockApi({
            getBlockByTimestamp,
            getBlockByHeight,
            getBlockById,
            getBlockId,
            getBlocks,
        })
        .withNetworkApi({
            getBlockchainStatus,
            getMiningInfo,
            getServerStatus,
            getSuggestedFees,
            getPeers,
            getPeer,
            getTime,
            getNetworkInfo
        })
        .withTransactionApi({
            broadcastTransaction,
            cancelSubscription,
            createSubscription,
            getDistributionAmountsFromTransaction,
            getSubscription,
            getTransaction,
            getTransactionByFullHash,
            getUnconfirmedTransactions,
            parseTransactionBytes,
            sendAmountToMultipleRecipients,
            sendAmountToSingleRecipient,
            sendSameAmountToMultipleRecipients,
            signAndBroadcastTransaction,
        })
        .withMessageApi({
            sendMessage,
            sendEncryptedMessage,
        })
        .withAccountApi({
            addCommitment,
            removeCommitment,
            getAccountTransactions,
            getUnconfirmedAccountTransactions,
            getAccountBalance,
            generateSendTransactionQRCode,
            generateSendTransactionQRCodeAddress,
            getAliases,
            setAlias,
            getAccount,
            getAccountBlocks,
            getAccountBlockIds,
            setAccountInfo,
            setRewardRecipient,
            getAccountSubscriptions,
            getSubscriptionsToAccount,
            getRewardRecipient,
            getTradeHistoryPerAccount
        }).withAliasApi({
            getAliasByName,
            getAliasById,
            setAlias,
            getAliasesOnSale,
            buyAlias,
            sellAlias,
            getAliases,
            searchAliasesByName,
            getTopLevelDomains,
            buyTopLevelDomain
        }).withContractApi({
            getContract,
            getContractsByAccount,
            getAllContractIds,
            publishContract,
            publishContractByReference,
            callContractMethod,
            getSingleContractMapValue,
            getContractMapValuesByFirstKey,
        }).withAssetApi({
            getAsset,
            getAllTrades,
            getAssetTrades,
            getAssetTradesPerAccount,
            getAssetTradesPerAsset,
            getAllAssets,
            issueAsset,
            mintAsset,
            burnAsset,
            transferAsset,
            transferAssetOwnership,
            transferMultipleAssets,
            placeAskOrder,
            placeBidOrder,
            cancelAskOrder,
            cancelBidOrder,
            getAssetHolders,
            getAssetTransfers,
            getAssetTransfersPerAccount,
            getAssetTransfersPerAsset,
            addAssetTreasuryAccount,
            distributeToAssetHolders,
            getOpenBidOrders,
            getOpenAskOrders,
            getOpenBidOrdersPerAsset,
            getOpenAskOrdersPerAsset,
            getOpenBidOrdersPerAccount,
            getOpenAskOrdersPerAccount,
            getTradeHistoryPerAccount,
            getAssetsByIssuer,
            getAssetsByOwner,
            getAssetsByName,
            calculateDistributionFee,
        })
        .compose();
}
