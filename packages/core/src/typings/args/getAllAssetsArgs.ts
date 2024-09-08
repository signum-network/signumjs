/**
 * The argument object for {@link AssetApi.getAllAssets}
 *
*
* @category args
*/
export interface GetAllAssetsArgs {
    /**
     * The first index to be returned. Use this for pagination. Starts at 0
     */
    firstIndex?: number;
    /**
     * The last index to be returned. Use this for pagination. If not set, at maximum 500 items beginning at firstIndex will be returned
     */
    lastIndex?: number;
    /**
     * Define the start height for trading information over a given period - if not given the last 360 blocks (around 24hrs) are taken as trading period
     */
    heightStart?: number;
    /**
     * Define the end height for trading information over a given period - if not given the current block is taken as end height
     */
    heightEnd?: number;
    /**
     * If set true all zero volumes are excluded
     */
    skipZeroVolume?: boolean;
}
