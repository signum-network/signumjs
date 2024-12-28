import {GetContractMapValuesByFirstKeyArgs} from './getContractMapValuesByFirstKeyArgs';

/**
 * The argument object for {@link ContractApi.getSingleContractMapValue}
 *
*
* @category args
*/
export interface GetSingleContractMapValueArgs extends GetContractMapValuesByFirstKeyArgs {
    /**
     * The second key of the mapping tuple.
     */
    key2: string;
}
