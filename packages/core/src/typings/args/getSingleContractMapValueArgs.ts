import {GetContractMapValuesByFirstKeyArgs} from './getContractMapValuesByFirstKeyArgs';

/**
 * The argument object for [[ContractApi.getSingleContractMapValue]]
 *
 * @module core
 */
export interface GetSingleContractMapValueArgs extends GetContractMapValuesByFirstKeyArgs {
    /**
     * The second key of the mapping tuple.
     */
    key2: string;
}
