/**
 * The argument object for [[ContractApi.getSingleContractMapValue]]
 *
 * @module core
 */
import {GetContractMapValuesByFirstKeyArgs} from './getContractMapValuesByFirstKeyArgs';

export interface GetSingleContractMapValueArgs extends GetContractMapValuesByFirstKeyArgs {
    /**
     * The second key of the mapping tuple.
     */
    key2: string;
}
