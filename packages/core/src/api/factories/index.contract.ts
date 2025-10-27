/**
 * Contract API
 * All smart contract operations (read and write)
 * @module api/contract
 */

export {
    // Read operations (no crypto)
    getAllContractIds,
    getContract,
    getContractMapValuesByFirstKey,
    getContractsByAccount,
    getSingleContractMapValue,
    getAllContractsByCodeHash,
    // Write operations (requires crypto/sign)
    publishContract,
    publishContractByReference,
    callContractMethod,
} from './contract';
