/**
 * The argument object for {@link AccountApi.getAccountTransactionsFromSenderToRecipient} or {@link AccountApi.getAccountTransactionsBetweenSenderAndRecipient}
 *
 * @param {string} senderId If using this then you get the transactions only for this sending account (can be used with recipientId)
 * @param {string} recipientId If using this then you get the transactions only for this receiving account (can be used with senderId)
 *
 * and speeds up fetching significantly
 * @param {number?} firstIndex The first index of the transaction list, beginning at 0
 * @param {number?} lastIndex The last index of the transaction list (BRS does not return more than 500)
 * @param {number?} numberOfConfirmations The minimum required number of confirmations per transaction
 * @param {number?} type The type of transactions to fetch (see {@link TransactionType})
 * @param {number?} subtype The subtype of transactions to fetch (see e.g. {@link TransactionArbitrarySubtype})
 * @param {boolean?} includeIndirect Includes indirect transaction, i.e. multi out payments.
*
* @category args
*/
export interface GetAccountTransactionsSenderRecipientArgs {
    timestamp?: string;
    firstIndex?: number;
    includeIndirect?: boolean;
    lastIndex?: number;
    numberOfConfirmations?: number;
    subtype?: number;
    type?: number;
    senderId: string;
    recipientId: string;
}
