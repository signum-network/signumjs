
/**
 * The argument object for [[AssetApi.getAssetOpenAskOrdersPerAsset]] and [[AssetApi.getAssetOpenBidOrdersPerAsset]]
 *
 * @module core
 */
export interface GetAssetOpenOrdersPerAssetArgs {
    assetId: string;
    firstIndex?: number;
    lastIndex?: number;
}
