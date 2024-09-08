/**
 * The argument object for {@link AliasApi.getTopLevelDomains}
 *
*
* @category args
*/
export interface GetTopLevelDomainsArgs {
    /**
     * The first index to be returned. Use this for pagination. Starts at 0
     */
    firstIndex?: number;
    /**
     * The last index to be returned. Use this for pagination. If not set, at maximum 500 items beginning at firstIndex will be returned
     */
    lastIndex?: number;
    /**
     * The timestamp in seconds since genesis block
     * @see {@link util.ChainTime}
     */
    timestamp?: number;
}
