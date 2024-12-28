/**
 * Copyright (c) 2019 Burst Apps Team
 */
import {ChainService} from '../../../service/chainService';
import {GetAllContractsByCodeHashArgs} from '../../../typings/args';
import {ContractList} from '../../../typings/contractList';

/**
 * Use with {@link ApiComposer} and belongs to {@link ContractApi}.
 *
 * See details at {@link ContractApi.getAllContractIds}
*
* @category factories
*/
export const getAllContractsByCodeHash = (service: ChainService):
    (args: GetAllContractsByCodeHashArgs) => Promise<ContractList> =>
    (args: GetAllContractsByCodeHashArgs): Promise<ContractList> => {
        const params = {
            machineCodeHashId: args.machineCodeHash,
            includeDetails: args.includeDetails || false,
            firstIndex: args.firstIndex,
            lastIndex: args.lastIndex,

        };

        return service.query('getATs', params);
    };
