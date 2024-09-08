
/**
 * The argument object for {@link ContractApi.getContractsByAccount}
 *
*
* @category args
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
