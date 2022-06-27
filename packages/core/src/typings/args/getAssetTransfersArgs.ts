
/**
 * The argument object for [[AssetApi.getAssetTransfers]]
 *
 * @module core
 */
export interface GetAssetTransfersArgs {
    assetId?: string;
    accountId?: string;
    includeAssetInfo?: boolean;
    firstIndex?: number;
    lastIndex?: number;
}
