
/**
 * The argument object for {@link AssetApi.getAllTrades}
 *
*
* @category args
*/
export interface GetAllTradesArgs {
    /**
     * The timestamp in seconds since genesis block
     * @see {@link util.ChainTime}
     */
    timestamp?: number;
    firstIndex?: number;
    lastIndex?: number;
}
