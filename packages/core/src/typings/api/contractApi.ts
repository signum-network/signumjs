import {Contract} from '@signumjs/contracts';
import {ContractList} from '../contractList';
import {ContractIdList} from '../contractIdList';
import {
    GetContractMapValuesByFirstKeyArgs,
    GetSingleContractMapValueArgs,
    PublishContractArgs,
    PublishContractByReferenceArgs,
    CallContractMethodArgs,
    GetAllContractIdsArgs,
    GetContractsByAccountArgs,
    GetAllContractsByCodeHashArgs
} from '../args';
import {TransactionId} from '../transactionId';
import {UnsignedTransaction} from '../unsignedTransaction';
import {ContractMapValueList} from '../contractMapValueList';

/**
 * Contract API
 *
 * This module provides methods about the smart contracts
 *
 * @category api
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
     * @return  The Transaction Id or Unsigned Bytes as Hex String if no private key was sent
     */
    publishContract: (args: PublishContractArgs) => Promise<TransactionId | UnsignedTransaction>;

   /**
     * Publishes a smart contract to the blockchain using the code base of an already existant contract.
     * This reduces payload in the chain, allowing to deploy many contracts per block and very cheap
     * @param args {PublishContractArgs} The argument object
     * @return  The Transaction Id or Unsigned Bytes as Hex String if no private key was sent
     */
    publishContractByReference: (args: PublishContractByReferenceArgs) => Promise<TransactionId | UnsignedTransaction>;

    /**
     * Calls a public method of smart contract
     * @param args {CallContractMethodArgs} The argument object
     * @return  The Transaction Id or Unsigned Bytes as Hex String if no private key was sent
     */
    callContractMethod: (args: CallContractMethodArgs) => Promise<TransactionId | UnsignedTransaction>;

    /**
     * Gets a map value from a contracts data store
     * @param args {GetSingleContractMapValueArgs} The argument object
     * @return  The value. Non-existing key-value tuples return always 0 (Zero)
     */
    getSingleContractMapValue: (args: GetSingleContractMapValueArgs) => Promise<{value: string}>;

    /**
     * Gets a key-value list for the given first key of a contracts data store
     * @param args {GetContractMapValuesByFirstKeyArgs} The argument object
     * @return  A list of values
     */
    getContractMapValuesByFirstKey: (args: GetContractMapValuesByFirstKeyArgs) => Promise<ContractMapValueList>;

    /**
     * Gets all contracts for a given machin code hash
     * @param args The argument object
     * @return A list of contracts
     */
    getAllContractsByCodeHash: (args: GetAllContractsByCodeHashArgs) => Promise<ContractList>;
}
