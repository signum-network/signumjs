
/**
 * The argument object for {@link TransactionApi.getSubscriptionPayments}
 *
 * @param {string} subscriptionId The numeric subscription Id
 * @param {number?} firstIndex The first index of the transaction list, beginning at 0
 * @param {number?} lastIndex The last index of the transaction list (BRS does not return more than 500)
*
* @category args
*/
export interface GetSubscriptionPaymentsArgs {
    subscriptionId: string;
    firstIndex?: number;
    lastIndex?: number;
}
