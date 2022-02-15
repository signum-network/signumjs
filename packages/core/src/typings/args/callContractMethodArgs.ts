import {ContractData} from '@signumjs/contracts';
import {DefaultSendArgs} from './defaultSendArgs';

/**
 * The argument object for [[ContractApi.callContractMethod]]
 *
 * @module core
 */
export interface CallContractMethodArgs extends DefaultSendArgs {
    amountPlanck: string;
    contractId: string;
    methodArgs?: ContractData[];
    methodHash: string;
}
