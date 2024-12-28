/**
 * The argument object for {@link AliasApi.getAliasesOnSale}
 *
*
* @category args
*/
export interface GetAliasesOnSaleArgs {
    /**
     * The account id of the owner, to filter alias sales by owner
     */
    accountId?: string;
    /**
     * The account id of the buyer, to filter alias direct offers
     */
    buyerId?: string;
    /**
     * The first index to be returned. Use this for pagination. Starts at 0
     */
    firstIndex?: number;
    /**
     * The last index to be returned. Use this for pagination. If not set, at maximum 500 items beginning at firstIndex will be returned
     */
    lastIndex?: number;
}
