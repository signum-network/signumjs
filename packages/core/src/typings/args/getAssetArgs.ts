
/**
 * The argument object for [[AssetApi.getAsset]]
 *
 * @module core
 */
export interface GetAssetArgs {
    /**
     * The assets/token id
     */
    assetId: string;
    /**
     * The minimum quantity (see also ChainValue) to be considered for `numberOfAccounts` response field.
     * This argument can help you to get the number of eligible amounts for distributionTokenHolders.
     * and the upfront fee calculation
     * If you set decimals to 4 and want to have 100 full assets, you need to set this value to 1000000
     */
    minimumQuantity?: string | number;

    /**
     * Define the start height for trading information over a given period -
     * if not given the last 360 blocks (around 24hrs) are taken as trading period
     */
    heightStart?: number;

    /**
     * Define the end height for trading information over a given period -
     * if not given the current block is taken as end height
     */
    heightEnd?: number;
}
