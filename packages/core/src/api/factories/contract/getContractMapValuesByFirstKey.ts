/**
 * Copyright (c) 2022 Signum Network
 */
import {ChainService} from '../../../service/chainService';
import {GetContractMapValuesByFirstKeyArgs } from '../../../typings/args';
import {ContractMapValueList} from '../../../typings/contractMapValueList';

/**
 * Use with {@link ApiComposer} and belongs to {@link ContractApi}.
 *
 * See details at {@link ContractApi.getContractMapValuesByFirstKey}
*
* @category factories
*/
export const getContractMapValuesByFirstKey = (service: ChainService):
    (args: GetContractMapValuesByFirstKeyArgs) => Promise<ContractMapValueList> =>
    (args: GetContractMapValuesByFirstKeyArgs): Promise<ContractMapValueList> => {
        const params = {
            at: args.contractId,
            key1: args.key1,
        };

        return service.query('getATMapValues', params);
    };
