import {ContractData} from '@signumjs/contracts';
import {DefaultSendArgs} from './defaultSendArgs';

/**
 * The argument object for {@link ContractApi.callContractMethod}
 *
*
* @category args
*/
export interface CallContractMethodArgs extends DefaultSendArgs {
    amountPlanck: string;
    assetId?: string;
    assetQuantity?: string;
    contractId: string;
    methodArgs?: ContractData[];
    methodId: string;
}
