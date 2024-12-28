/**
 * Copyright (c) 2019 Burst Apps Team
 * Modified (c) 2021 Signum Network
 */
import {ChainService} from '../../../service/chainService';
import {ContractList} from '../../../typings/contractList';
import {GetContractsByAccountArgs} from '../../../typings/args/getContractsByAccountArgs';

/**
 * Use with {@link ApiComposer} and belongs to {@link ContractApi}.
 *
 * See details at {@link ContractApi.getContractsByAccount}
*
* @category factories
*/
export const getContractsByAccount = (service: ChainService):
    (args: GetContractsByAccountArgs) => Promise<ContractList> =>
    (args: GetContractsByAccountArgs): Promise<ContractList> => {
        const params = {
            account: args.accountId,
            machineCodeHashId: args.machineCodeHash
        };
        return service.query('getAccountATs', params);
    };
