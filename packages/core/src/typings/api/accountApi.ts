import {TransactionList} from '../transactionList';
import {SubscriptionList} from '../subscriptionList';
import {UnconfirmedTransactionList} from '../unconfirmedTransactionList';
import {Balance} from '../balance';
import {Account} from '../account';
import {TransactionId} from '../transactionId';
import {
    CommitmentArgs,
    GetAccountBlocksArgs,
    GetAccountTransactionsArgs,
    SetRewardRecipientArgs,
    GetAccountArgs,
    SetAccountInfoArgs,
    SetAliasArgs, GetTradeHistoryPerAccountArgs
} from '../args';
import {RewardRecipient} from '../rewardRecipient';
import {BlockList} from '../blockList';
import {UnsignedTransaction} from '../unsignedTransaction';
import {TradeHistory} from '../tradeHistory';
import {GetAccountTransactionsSenderRecipientArgs} from '../args/getAccountTransactionsSenderRecipientArgs';

/**
 * Account API
 *
 * @category api
 */
export interface AccountApi {

    /**
     * Get transactions of given account
     * @param {GetAccountTransactionsArgs} args The arguments
     * @return {Promise<TransactionList>} List of transactions
     */
    getAccountTransactions: (args: GetAccountTransactionsArgs) => Promise<TransactionList>;

    /**
     * Get all transactions from sender to recipient
     *
     * @note This method __does not resolve__ amount of distributions to token holders
     *
     * @param {GetAccountTransactionsSenderRecipientArgs} args The arguments
     * @return {Promise<TransactionList>} List of transactions
     */
    getAccountTransactionsFromSenderToRecipient: (args: GetAccountTransactionsSenderRecipientArgs) => Promise<TransactionList>;


    /**
     * Get all transactions from specific sender
     *
     * @note This method __does not resolve__ amount of distributions to token holders
     *
     * @param {Omit<GetAccountTransactionsSenderRecipientArgs, 'recipientId'>} args The arguments
     * @return {Promise<TransactionList>} List of transactions
     */
    getAccountTransactionsFromSender: (args: Omit<GetAccountTransactionsSenderRecipientArgs, 'recipientId'>) => Promise<TransactionList>;

    /**
     * Get all transactions to specific recipient
     *
     * @note This method __does not resolve__ amount of distributions to token holders
     *
     * @param {Omit<GetAccountTransactionsSenderRecipientArgs, 'senderId'>} args The arguments
     * @return {Promise<TransactionList>} List of transactions
     */
    getAccountTransactionsToRecipient: (args: Omit<GetAccountTransactionsSenderRecipientArgs, 'senderId'>) => Promise<TransactionList>;

    /**
     * Get all transactions between sender and recipient (in both transfer directions)
     *
     * @note This method __does not resolve__ amount of distributions to token holders
     *
     * @param {Omit<GetAccountTransactionsArgs, 'accountId'>} args The arguments
     * @return {Promise<TransactionList>} List of transactions
     */
    getAccountTransactionsBetweenSenderAndRecipient: (args: GetAccountTransactionsSenderRecipientArgs) => Promise<TransactionList>;

    /**
     * Get _unconfirmed_ transactions of given account
     * @param {string} accountId The numeric accountId
     * @param {boolean?} includeIndirect Includes indirect transaction, i.e. multi out payments.
     * For BRS Versions before 2.3.2 this must be `undefined`
     * @return {Promise<UnconfirmedTransactionList>} List of unconfirmed transactions
     */
    getUnconfirmedAccountTransactions: (
        accountId: string,
        includeIndirect?: boolean
    ) => Promise<UnconfirmedTransactionList>;

    /**
     * Get the balance of an account
     * @param {string} accountId
     * @return {Promise<Balance>} The account's balance
     */
    getAccountBalance: (accountId: string) => Promise<Balance>;

    /**
     * Get an account given an ID
     * @param {GetAccountArgs} args The arguments
     * @return {Promise<Account>} The account from the backend, not including transactions
     */
    getAccount: (args: GetAccountArgs) => Promise<Account>;

    /**
     * Get blocks forged by an account
     * @param {GetAccountBlocksArgs} args The arguments
     * @return {Promise<Block[]>} The list of blocks
     */
    getAccountBlocks: (args: GetAccountBlocksArgs) => Promise<BlockList>;

    /**
     * Get blockIds forged by an account
     * @param {GetAccountBlocksArgs} args The arguments
     * @return {Promise<string[]>} The list of blocks
     */
    getAccountBlockIds: (args: GetAccountBlocksArgs) => Promise<string[]>;

    /**
     * Get QR Code image for a given BURST address
     * @param {string} receiverId The recipient burst
     * @param {number?} amountNQT The amount (in NQT) to request (Default = 0)
     * @param {string?} feeSuggestionType The fee suggestion type string (Default = 'standard')
     * @param {number?} feeNQT The fee amount (in NQT)
     * @param {immutable?} immutable Whether to allow this to be modified
     * @return {Promise<ArrayBufferLike>} QR code image data
     */
    generateSendTransactionQRCode: (
        receiverId: string,
        amountNQT?: number,
        feeSuggestionType?: string,
        feeNQT?: number,
        immutable?: boolean
    ) => Promise<ArrayBufferLike>;


    /**
     * Generate the URL for a QR Code for a given BURST address. Useful for IMG tags in HTML.
     * @param {string} receiverId The recipient burst address
     * @param {number?} amountNQT The amount (in NQT) to request (Default = 0)
     * @param {string?} feeSuggestionType The fee suggestion type string (Default = 'standard')
     * @param {number?} feeNQT The fee amount (in NQT)
     * @param {immutable?} immutable Whether to allow this to be modified
     * @return {Promise<string>} The url
     */
    generateSendTransactionQRCodeAddress: (
        receiverId: string,
        amountNQT?: number,
        feeSuggestionType?: string,
        feeNQT?: number,
        immutable?: boolean
    ) => Promise<string>;

    /**
     * Sets or Updates an Alias
     * @param {SetAliasArgs} args The arguments
     *
     * @return The Transaction Id or Unsigned Bytes as Hex String if no private key was sent
     */
    setAlias: (args: SetAliasArgs) => Promise<TransactionId | UnsignedTransaction>;


    /**
     * Sets account information for an account
     * @param {SetAccountInfoArgs} args The arguments
     *
     * @return The Transaction Id or Unsigned Bytes as Hex String if no private key was sent
     */
    setAccountInfo: (args: SetAccountInfoArgs) => Promise<TransactionId | UnsignedTransaction>;

    /**
     * Assigns a reward recipient for an account
     *
     * This function is usually used to bind an account to a mining pool.
     *
     * @param {SetRewardRecipientArgs} args The arguments
     * @return The Transaction Id or Unsigned Bytes as Hex String if no private key was sent
     **/
    setRewardRecipient: (args: SetRewardRecipientArgs) => Promise<TransactionId | UnsignedTransaction>;


    /**
     * Gets a list of subscriptions for this account (sender)
     *
     * @param accountId The sender account Id
     * @return List of Subscriptions
     */
    getAccountSubscriptions: (accountId: string) => Promise<SubscriptionList>;

    /**
     * Gets a list of subscriptions paying to the given account (recipient)
     *
     * @param accountId The recipient account Id
     * @return List of Subscriptions
     */
    getSubscriptionsToAccount: (accountId: string) => Promise<SubscriptionList>;

    /**
     * Gets the reward recipient for an account
     *
     * So you can see, if an account is bound to a pool.
     *
     * @param {string} accountId The account Id
     * @return The Reward Recipient
     */
    getRewardRecipient: ( accountId: string ) => Promise<RewardRecipient>;

    /**
     * Adds an additional amount as commitment
     *
     * The commitment is part of the PoC+ consensus, and allows miners
     * to improve their mining power through additionally locked amount
     *
     * @param {CommitmentArgs} args The args
     * @return The Transaction Id or Unsigned Bytes as Hex String if no private key was sent
     * @see {@link AccountApi.removeCommitment}
     */
    addCommitment: (args: CommitmentArgs) => Promise<TransactionId | UnsignedTransaction>;

    /**
     * Removes/Reduces a miners commitment
     *
     * The commitment is part of the PoC+ consensus, and allows miners
     * to improve their mining power through additionally locked amount
     *
     * @param {CommitmentArgs} args The args
     * @return The Transaction Id or Unsigned Bytes as Hex String if no private key was sent
     * @see {@link AccountApi.addCommitment}
     */
    removeCommitment: (args: CommitmentArgs) => Promise<TransactionId | UnsignedTransaction>;

    /**
     * The trade history is a journal about open/filled and/or cancelled trades for a given account and
     * optionally set asset
     *
     * @param {GetTradeHistoryPerAccountArgs} args The args object
     *
     * @return The trade history
     */
    getTradeHistoryPerAccount: (args: GetTradeHistoryPerAccountArgs) => Promise<TradeHistory>;
}
