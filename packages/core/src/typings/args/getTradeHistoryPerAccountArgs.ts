
/**
 * The argument object for {@link AssetApi.getTradeHistoryPerAccount}
 *
*
* @category args
*/
export interface GetTradeHistoryPerAccountArgs {
    accountId: string;
    assetId?: string;
    firstIndex?: number;
    lastIndex?: number;
}
