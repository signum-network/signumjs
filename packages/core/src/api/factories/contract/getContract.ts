/**
 * Copyright (c) 2019 Burst Apps Team
 */
import {ChainService} from '../../../service/chainService';
import {Contract} from '@signumjs/contracts';
// import {Contract} from '../../../typings/contract';

/**
 * Use with {@link ApiComposer} and belongs to {@link ContractApi}.
 *
 * See details at {@link ContractApi.getContract}
*
* @category factories
*/
export const getContract = (service: ChainService):
    (id: string) => Promise<Contract> =>
    (id: string): Promise<Contract> =>
        service.query('getAT', {
            at: id,
        });
