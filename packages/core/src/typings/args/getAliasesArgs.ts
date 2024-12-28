/**
 * The argument object for {@link AliasApi.getAliases}
 *
 * @category args
 */
export interface GetAliasesArgs {
    /**
     * The accountId id
     */
    accountId?: string;

    /**
     * The alias name
     */
    aliasName?: string;

    /**
     * The timestamp (block time) you are looking for
     */
    timestamp?: number;

    /**
     * The first index of the list, beginning at 0
     */
    firstIndex?: number;
    /**
     * The last index of the list. At maximum 500 will be returned
     */
    lastIndex?: number;

    /**
     * The Top Level Domain. If it is given without further parameters all aliases of this tld are being returned.
     */
    tld?: string;
}
