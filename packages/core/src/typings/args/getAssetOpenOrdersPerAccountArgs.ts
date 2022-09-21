
/**
 * The argument object for [[AssetApi.getAccountOpenAskOrdersPerAccount]] and [[AssetApi.getAccountOpenBidOrdersPerAccount]]
 *
 * @module core
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
