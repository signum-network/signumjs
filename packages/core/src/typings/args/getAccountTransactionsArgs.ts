/**
 * The argument object for {@link AccountApi.getAccountTransactions}
 *
 * @param {string} accountId The numeric accountId
 * @param {string?} timestamp The timestamp (block time) you are looking for
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
    accountId: string;
    timestamp?: string;
    firstIndex?: number;
    includeIndirect?: boolean;
    resolveDistributions?: boolean;
    lastIndex?: number;
    numberOfConfirmations?: number;
    subtype?: number;
    type?: number;
}
