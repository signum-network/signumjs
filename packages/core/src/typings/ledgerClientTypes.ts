/**
 * Ledger client types for different use cases
 * @module core
 */

import type {
    AccountApi,
    AliasApi,
    AssetApi,
    BlockApi,
    ContractApi,
    MessageApi,
    NetworkApi,
    TransactionApi,
} from './api';
import type {ChainService} from '../service';

/**
 * Read-only Ledger client
 * Contains only read operations (get*, query*, etc.)
 * No crypto dependencies - minimal bundle size
 *
 * Use case: Dashboards, explorers, monitoring tools
 */
export interface ReadOnlyLedger {
    service: ChainService;

    account: Pick<AccountApi,
        'getAccount' |
        'getAccountBalance' |
        'getAccountBlockIds' |
        'getAccountBlocks' |
        'getAccountSubscriptions' |
        'getAccountTransactions' |
        'getAccountTransactionsBetweenSenderAndRecipient' |
        'getAccountTransactionsFromSender' |
        'getAccountTransactionsFromSenderToRecipient' |
        'getAccountTransactionsToRecipient' |
        'getRewardRecipient' |
        'getSubscriptionsToAccount' |
        'getUnconfirmedAccountTransactions' |
        'generateSendTransactionQRCode' |
        'generateSendTransactionQRCodeAddress'
    >;

    block: BlockApi;

    network: NetworkApi;

    transaction: Pick<TransactionApi,
        'getTransaction' |
        'getTransactionByFullHash' |
        'getUnconfirmedTransactions' |
        'parseTransactionBytes' |
        'getDistributionAmountsFromTransaction' |
        'getSubscription' |
        'getSubscriptionPayments'
    >;

    asset: Pick<AssetApi,
        'getAllAssets' |
        'getAsset' |
        'getAssetHolders' |
        'getAssetTransfers' |
        'getAssetTransfersPerAccount' |
        'getAssetTransfersPerAsset' |
        'getAllTrades' |
        'getAssetTrades' |
        'getAssetTradesPerAccount' |
        'getAssetTradesPerAsset' |
        'getOpenBidOrders' |
        'getOpenAskOrders' |
        'getOpenBidOrdersPerAsset' |
        'getOpenAskOrdersPerAsset' |
        'getOpenBidOrdersPerAccount' |
        'getOpenAskOrdersPerAccount' |
        'getAssetsByIssuer' |
        'getAssetsByName' |
        'getAssetsByOwner' |
        'calculateDistributionFee' |
        'getTradeHistoryPerAccount'
    >;

    contract: Pick<ContractApi,
        'getContract' |
        'getContractsByAccount' |
        'getAllContractIds' |
        'getSingleContractMapValue' |
        'getContractMapValuesByFirstKey' |
        'getAllContractsByCodeHash'
    >;

    alias: Pick<AliasApi,
        'getAliasByName' |
        'getAliasById' |
        'getAliasesOnSale' |
        'getAliases' |
        'searchAliasesByName' |
        'getTopLevelDomains'
    >;
}

/**
 * Standard Ledger client (without encrypted messaging)
 * Contains read and write operations, including signing
 * Dependencies: crypto/sign (no Pako compression)
 *
 * Use case: Most applications - wallets, payments, asset trading
 * This is the recommended default for most use cases
 */
export interface StandardLedger {
    service: ChainService;

    account: AccountApi;
    block: BlockApi;
    network: NetworkApi;
    transaction: TransactionApi;
    asset: AssetApi;
    contract: ContractApi;
    alias: AliasApi;

    // Plain text messaging only (no encrypted messaging)
    message: Pick<MessageApi, 'sendMessage'>;
}

/**
 * Full Ledger client with encrypted messaging
 * Contains all operations including encrypted messaging
 * Dependencies: crypto/sign + crypto/encryption (with Pako compression)
 *
 * Use case: Messaging applications, private communication
 */
export interface FullLedger {
    service: ChainService;

    account: AccountApi;
    block: BlockApi;
    network: NetworkApi;
    transaction: TransactionApi;
    asset: AssetApi;
    contract: ContractApi;
    alias: AliasApi;

    // Full messaging API including encrypted messaging
    message: MessageApi;
}
