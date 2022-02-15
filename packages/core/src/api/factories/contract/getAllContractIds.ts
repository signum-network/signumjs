/**
 * Copyright (c) 2019 Burst Apps Team
 */
import {ChainService} from '../../../service/chainService';
import {ContractIdList} from '../../../typings/contractIdList';
import {GetAllContractIdsArgs} from '../../../typings/args/getAllContractIdsArgs';

/**
 * Use with [[ApiComposer]] and belongs to [[ContractApi]].
 *
 * See details at [[ContractApi.getAllContractIds]]
 * @module core.api.factories
 */
export const getAllContractIds = (service: ChainService):
    (args?: GetAllContractIdsArgs) => Promise<ContractIdList> =>
    (args?: GetAllContractIdsArgs): Promise<ContractIdList> => {
        const params = {
            machineCodeHashId: args?.machineCodeHash || undefined
        };

        return service.query('getATIds', params);
    };
