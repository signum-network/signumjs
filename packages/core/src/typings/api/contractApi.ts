import {Contract} from '../contract';
import {ContractList} from '../contractList';
import {ContractIdList} from '../contractIdList';
import {PublishContractArgs, PublishContractByReferenceArgs} from '../args';
import {TransactionId} from '../transactionId';
import {CallContractMethodArgs} from '../args/callContractMethodArgs';
import {GetAllContractIdsArgs} from '../args/getAllContractIdsArgs';
import {GetContractsByAccountArgs} from '../args/getContractsByAccountArgs';

/**
 * Contract API
 *
 * This module provides methods about the smart contracts
 *
 * @module core.api
 */
export interface ContractApi {
    /**
     * Get a contract by its Id
     * @param id The ID of the contract
     * @return {Contract} The contract
     */
    getContract: (id: string) => Promise<Contract>;

    /**
     * Get all contracts of given account, or filtered by the arguments
     * @param args {GetContractsByAccountArgs} The argument object
     * @returns {ContractList} A list of contracts
     */
    getContractsByAccount: (args: GetContractsByAccountArgs) => Promise<ContractList>;


    /**
     * Get all contract Ids of the blockchain, or filtered by the argument
     * @param args {GetAllContractIdsArgs} The argument object
     * @return {ContractIdList} The list of contract ids
     */
    getAllContractIds: (args: GetAllContractIdsArgs) => Promise<ContractIdList>;


    /**
     * Publishes a smart contract to the blockchain
     * @param args {PublishContractArgs} The argument object
     * @return {TransactionId} The transaction id in case of success
     */
    publishContract: (args: PublishContractArgs) => Promise<TransactionId>;

   /**
     * Publishes a smart contract to the blockchain using the code base of an already existant contract.
     * This reduces payload in the chain, allowing to deploy many contracts per block and very cheap
     * @param args {PublishContractArgs} The argument object
     * @return {TransactionId} The transaction id in case of success
     */
    publishContractByReference: (args: PublishContractByReferenceArgs) => Promise<TransactionId>;

    /**
     * Calls a public method of smart contract
     * @param args {CallContractMethodArgs} The argument object
     * @return {TransactionId} The transaction id in case of success
     */
    callContractMethod: (args: CallContractMethodArgs) => Promise<TransactionId>;

}
