
/**
 * The argument object for [[AssetApi.getAssetTradesPerAccount]]
 *
 * @module core
 */
export interface GetAssetTradesPerAccountArgs {
    accountId: string;
    includeAssetInfo?: boolean;
    firstIndex?: number;
    lastIndex?: number;
}
