
/**
 * The argument object for [[AssetApi.getOpenAskOrdersPerAsset]] and [[AssetApi.getOpenBidOrdersPerAsset]]
 *
 * @module core
 */
export interface GetAssetOpenOrdersPerAssetArgs {
    assetId: string;
    firstIndex?: number;
    lastIndex?: number;
}
