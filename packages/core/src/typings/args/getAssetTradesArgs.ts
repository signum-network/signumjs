
/**
 * The argument object for [[AssetApi.getAssetTrades]]
 *
 * @module core
 */
export interface GetAssetTradesArgs {
    assetId?: string;
    accountId?: string;
    includeAssetInfo?: boolean;
    firstIndex?: number;
    lastIndex?: number;
}
