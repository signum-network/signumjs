/**
 * The argument object for {@link AccountApi.getAccountTransactions}
 *
 * @param {string|null} accountId The numeric accountId (set it explicitly null when using senderId and/or recipientId)
 * @param {string?} senderId If using this then you get the transactions only for this sending account (can be used with recipientId)
 * @param {string?} recipientId If using this then you get the transactions only for this receiving account (can be used with senderId)
 * @param {boolean?} bidirectional Only for senderId and recipientId - If true then all transfers between (back and forth) senderId and recipientId are returned
 * @param {string?} timestamp The timestamp (block time) you are looking for. This is cool for incremental transaction loading
 * and speeds up fetching significantly
 * @param {number?} firstIndex The first index of the transaction list, beginning at 0
 * @param {number?} lastIndex The last index of the transaction list (BRS does not return more than 500)
 * @param {number?} numberOfConfirmations The minimum required number of confirmations per transaction
 * @param {number?} type The type of transactions to fetch (see {@link TransactionType})
 * @param {number?} subtype The subtype of transactions to fetch (see e.g. {@link TransactionArbitrarySubtype})
 * @param {boolean?} includeIndirect Includes indirect transaction, i.e. multi out payments.
 * @param {boolean?} resolveDistributions Resolves the amounts from {@link AssetApi.distributeToAssetHolders}
*
* @category args
*/
export interface GetAccountTransactionsArgs {
    accountId: string | null; // explicit null
    timestamp?: string;
    firstIndex?: number;
    includeIndirect?: boolean;
    resolveDistributions?: boolean;
    lastIndex?: number;
    numberOfConfirmations?: number;
    subtype?: number;
    type?: number;
    recipientId?: string;
    senderId?: string;
    bidirectional?: boolean;
}
