
/**
 * The argument object for [[ContractApi.getContractsByAccount]]
 *
 * @module core
 */
export interface GetContractsByAccountArgs {
    /**
     * Account Id
     */
    accountId: string;
    /**
     * The hash of the machine code, to get only the contracts that match this hash
     */
    machineCodeHash?: string;
}
