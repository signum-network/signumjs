/**
 * The argument object for [[AliasApi.searchAliasesByName]]
 *
 * @module core
 */
export interface SearchAliasesByNameArgs {
    /**
     * The name or part of the name to search for.
     */
    aliasName: string;
    /**
     * The first index to be returned. Use this for pagination. Starts at 0
     */
    firstIndex?: number;
    /**
     * The last index to be returned. Use this for pagination. If not set, at maximum 500 items beginning at firstIndex will be returned
     */
    lastIndex?: number;

    /**
     * The timestamp in seconds since genesis block.
     * @see [[util.ChainTime]]
     */
    timestamp?: number;
}
