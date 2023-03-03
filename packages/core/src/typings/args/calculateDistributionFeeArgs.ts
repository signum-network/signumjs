/**
 * The argument object for [[AssetApi.calculateDistributionFee]]
 * @module core
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
