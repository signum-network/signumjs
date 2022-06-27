
/**
 * The argument object for [[AssetApi.getAssetHolders]]
 *
 * @module core
 */
export interface GetAssetHoldersArgs {
    assetId: string;
    ignoreTreasuryAccount?: boolean;
    minimumQuantity?: string;
    firstIndex?: number;
    lastIndex?: number;
}
