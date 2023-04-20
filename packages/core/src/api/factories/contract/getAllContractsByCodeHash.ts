/**
 * Copyright (c) 2019 Burst Apps Team
 */
import {ChainService} from '../../../service/chainService';
import {GetAllContractsByCodeHashArgs} from '../../../typings/args';
import {ContractList} from '../../../typings/contractList';

/**
 * Use with [[ApiComposer]] and belongs to [[ContractApi]].
 *
 * See details at [[ContractApi.getAllContractIds]]
 * @module core.api.factories
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
