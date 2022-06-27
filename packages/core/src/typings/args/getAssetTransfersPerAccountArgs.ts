
/**
 * The argument object for [[AssetApi.getAssetTransfersPerAccount]]
 *
 * @module core
 */
export interface GetAssetTransfersPerAccountArgs {
    accountId: string;
    includeAssetInfo?: boolean;
    firstIndex?: number;
    lastIndex?: number;
}
