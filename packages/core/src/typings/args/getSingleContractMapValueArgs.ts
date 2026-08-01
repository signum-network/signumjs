import {GetContractMapValuesByFirstKeyArgs} from './getContractMapValuesByFirstKeyArgs';

/**
 * The argument object for {@link ContractApi.getSingleContractMapValue}
 *
*
* @category args
*/
export interface GetSingleContractMapValueArgs extends GetContractMapValuesByFirstKeyArgs {
    /**
     * The second key of the mapping tuple. Mind this is signed long!
     */
    key2: string;
}
