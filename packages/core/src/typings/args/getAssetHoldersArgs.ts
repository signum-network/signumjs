
/**
 * The argument object for {@link AssetApi.getAssetHolders}
 *
*
* @category args
*/
export interface GetAssetHoldersArgs {
    assetId: string;
    ignoreTreasuryAccount?: boolean;
    minimumQuantity?: string;
    firstIndex?: number;
    lastIndex?: number;
}
