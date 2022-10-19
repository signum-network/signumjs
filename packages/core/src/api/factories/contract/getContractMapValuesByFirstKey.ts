/**
 * Copyright (c) 2022 Signum Network
 */
import {ChainService} from '../../../service/chainService';
import {GetContractMapValuesByFirstKeyArgs, GetSingleContractMapValueArgs} from '../../../typings/args';
import {ContractMapValueList} from '../../../typings/contractMapValueList';

/**
 * Use with [[ApiComposer]] and belongs to [[ContractApi]].
 *
 * See details at [[ContractApi.getAllContractIds]]
 * @module core.api.factories
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
