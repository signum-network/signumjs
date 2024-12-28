
/**
 * The argument object for {@link AssetApi.getOpenAskOrdersPerAccount} and {@link AssetApi.getOpenBidOrdersPerAccount}
 *
*
* @category args
*/
export interface GetAssetOpenOrdersPerAccountArgs {
    /**
     * The Account Identifier
     */
    accountId: string;
    /**
     * An optional asset identifier to filter by given asset
     */
    assetId?: string;
    firstIndex?: number;
    lastIndex?: number;
}
