
/**
 * The argument object for {@link ContractApi.getContractMapValuesByFirstKey}
 *
*
* @category args
*/
export interface GetContractMapValuesByFirstKeyArgs {
    /**
     * The id of the contract
     */
    contractId: string;
    /**
     * The first key of the mapping tuple. Mind this is signed long!
     */
    key1: string;

    /**
     * The value to be searched for. Mind this is signed long!
     */
    value?: string;

    /**
     * The index of the first result to return. Use for pagination
     */
    firstIndex?: number;

    /**
     * The index of the last result to return. Use for pagination - if not defined max 500 values are being returned
     */
    lastIndex?: number;


}
