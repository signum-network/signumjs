/**
 * Copyright (c) 2022 Signum Network
 */
import {ChainService} from '../../../service/chainService';
import {GetSingleContractMapValueArgs} from '../../../typings/args';

/**
 * Use with {@link ApiComposer} and belongs to {@link ContractApi}.
 *
 * See details at {@link ContractApi.getSingleContractMapValue}
*
* @category factories
*/
export const getSingleContractMapValue = (service: ChainService):
    (args: GetSingleContractMapValueArgs) => Promise<{value: string}> =>
    (args: GetSingleContractMapValueArgs): Promise<{value: string}> => {
        const params = {
            at: args.contractId,
            key1: args.key1,
            key2: args.key2
        };

        return service.query('getATMapValue', params);
    };
