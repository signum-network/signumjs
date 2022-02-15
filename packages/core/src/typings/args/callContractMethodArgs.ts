import {ContractData} from '@signumjs/contracts';

/**
 * The argument object for [[ContractApi.callContractMethod]]
 *
 * @module core
 */
export interface CallContractMethodArgs {
    amountPlanck: string;
    contractId: string;
    deadline?: number;
    feePlanck: string;
    methodArgs?: ContractData[];
    methodHash: string;
    senderPrivateKey: string;
    senderPublicKey: string;
}
