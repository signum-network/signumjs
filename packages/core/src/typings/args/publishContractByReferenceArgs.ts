import {DefaultSendArgs} from './defaultSendArgs';
import {ContractData} from '@signumjs/contracts';

/**
 * The argument object for [[ContractApi.publishContractByReference]]
 *
 * @param referencedTransactionHash {string} Reference, i.e. Transactions Full Hash [[TransactionId.fullHash]],
 * to the already deployed contract
 * @param description {string} The description of your contract (max. 1000 chars)
 * @param name {string} The name for the contract
 * @param data {string} is optional here, the initial data for the contract
 * (must be according to your data stack in your contract and in BE hex code)
 * @see To deploy a new non-existing contract you need to use [[ContractApi.publishContract]]
 *
 * @module core
 */
export interface PublishContractByReferenceArgs extends DefaultSendArgs {
    description: string;
    name: string;
    referencedTransactionHash: string;
    data?: ContractData[];
}
