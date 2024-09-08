/**
 * The argument object for {@link AssetApi.calculateDistributionFee}
*
* @category args
*/
export interface CalculateDistributionFeeArgs {
    /**
     * The asset Id
     */
    assetId: string;
    /**
     * The minimum quantity (in atomic chain value) necessary for distribution
     */
    minimumQuantity?: number | string;
}
