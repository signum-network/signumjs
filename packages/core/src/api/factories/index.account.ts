/**
 * Account API
 * All account-related operations (read and write)
 * @module api/account
 */

export {
    // Read operations (no crypto)
    generateSendTransactionQRCode,
    generateSendTransactionQRCodeAddress,
    getAccount,
    getAccountBalance,
    getAccountBlockIds,
    getAccountBlocks,
    getAccountSubscriptions,
    getAccountTransactions,
    getSubscriptionsToAccount,
    getUnconfirmedAccountTransactions,
    getRewardRecipient,
    getAccountTransactionsBetweenSenderAndRecipient,
    getAccountTransactionsFromSenderToRecipient,
    getAccountTransactionsToRecipient,
    getAccountTransactionsFromSender,
    // Write operations (requires crypto/sign)
    setAccountInfo,
    setAlias,
    setRewardRecipient,
    addCommitment,
    removeCommitment,
} from './account';
