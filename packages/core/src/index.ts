/**
 * This is the main package, and almost all you may need to interact with
 * the Signum Node API
 *
 * @see Get started with [[composeApi]] or [[LedgerClientFactory]]
 *
 * @moduledefinition core
 * */

// order alphabetically, please :)
export * from './address';
export * from './api';
export * from './attachment';
export * from './constants';
export * from './ledgerClient';
export * from './service';
export * from './transaction';
export * from './typings/account';
export * from './typings/alias';
export * from './typings/aliasList';
export * from './typings/api';
export * from './typings/args';
export * from './typings/asset';
export * from './typings/assetList';
export * from './typings/assetTransfer';
export * from './typings/assetTransferList';
export * from './typings/assetAccount';
export * from './typings/assetAccountList';
export * from './typings/attachment';
export * from './typings/balance';
export * from './typings/block';
export * from './typings/blockId';
export * from './typings/blockIdList';
export * from './typings/blockList';
export * from './typings/blockchainStatus';
export * from './typings/chainTimestamp';
export * from './typings/distributionAmount';
export * from './typings/miningInfo';
export * from './typings/multioutRecipientAmount';
export * from './typings/peer';
export * from './typings/peerAddressList';
export * from './typings/rewardRecipient';
export * from './typings/serverStatus';
export * from './typings/subscription';
export * from './typings/subscriptionList';
export * from './typings/suggestedFees';
export * from './typings/transaction';
export * from './typings/transactionId';
export * from './typings/transactionList';
export * from './typings/unsignedTransaction';
export * from './typings/unconfirmedTransactionList';

// bad workaround is to comment next line when build docs
// FIXME: This conflicts with tsdoc
// export {Amount, ChainTime, ChainValue} from '@signumjs/util';

