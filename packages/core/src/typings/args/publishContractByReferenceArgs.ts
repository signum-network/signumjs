/**
 * The argument object for [[ContractApi.publishContractByReference]]
 *
 * @param activationAmountPlanck {string} The amount in planck needed to execute the contract
 * @param referencedTransactionHash {string} Reference, i.e. Transactions Full Hash [[TransactionId.fullHash]], to the already deployed contract
 * @param description {string} The description of your contract (max. 1000 chars)
 * @param name {string} The name for the contract
 * @module core
 *
 * @see To deploy a new non-existing contract you need to use [[ContractApi.publishContract]]
 */
import {DefaultSendArgs} from './defaultSendArgs';

export interface PublishContractByReferenceArgs extends DefaultSendArgs {
    activationAmountPlanck: string;
    description: string;
    name: string;
    referencedTransactionHash?: string;
}
