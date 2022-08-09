
/**
 * The argument object for [[AssetApi.getAllTrades]]
 *
 * @module core
 */
export interface GetAllTradesArgs {
    timestamp?: string;
    firstIndex?: number;
    lastIndex?: number;
    includeAssetInfo?: boolean;
}
