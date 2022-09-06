
/**
 * The argument object for [[AssetApi.getAllTrades]]
 *
 * @module core
 */
export interface GetAllTradesArgs {
    /**
     * The timestamp in seconds since genesis block
     * @see [[util.ChainTime]]
     */
    timestamp?: number;
    firstIndex?: number;
    lastIndex?: number;
}
