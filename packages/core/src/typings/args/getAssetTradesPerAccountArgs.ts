
/**
 * The argument object for {@link AssetApi.getAssetTradesPerAccount}
 *
*
* @category args
*/
export interface GetAssetTradesPerAccountArgs {
    accountId: string;
    includeAssetInfo?: boolean;
    firstIndex?: number;
    lastIndex?: number;
}
