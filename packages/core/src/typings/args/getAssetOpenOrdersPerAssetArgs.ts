
/**
 * The argument object for {@link AssetApi.getOpenAskOrdersPerAsset} and {@link AssetApi.getOpenBidOrdersPerAsset}
 *
*
* @category args
*/
export interface GetAssetOpenOrdersPerAssetArgs {
    assetId: string;
    firstIndex?: number;
    lastIndex?: number;
}
