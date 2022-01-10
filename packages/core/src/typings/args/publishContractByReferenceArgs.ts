/**
 * The argument object for [[ContractApi.publishContractByReference]]
 *
 * @param activationAmountPlanck {string} The amount in planck needed to execute the contract
 * @param referencedTransaction {string} Reference, i.e. Transaction Id, to the already deployed contract
 * @param description {string} The description of your contract (max. 1000 chars)
 * @param name {string} The name for the contract
 * @module core
 *
 * @see If the contract Consider publishing by reference also, which is way cheaper: [[ContractApi.publishContract]]
 */
import {DefaultSendArgs} from './defaultSendArgs';

export interface PublishContractByReferenceArgs extends DefaultSendArgs {
    activationAmountPlanck: string;
    description: string;
    name: string;
    referencedTransaction?: string;
}
