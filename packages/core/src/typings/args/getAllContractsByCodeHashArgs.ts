
/**
 * The argument object for [[ContractApi.getAllContractsByCodeHash]]
 *
 * @module core
 */
export interface GetAllContractsByCodeHashArgs {
    /**
     * The hash of the machine code
     */
    machineCodeHash: string;

    /**
     * If true all information, including byte code and initial data stack will be returned.
     * Note, that using `true` leads to significantly larger payloads
     * Default is `false`
     */
    includeDetails?: boolean;
    /**
     * The first index of the list, beginning at 0
     */
    firstIndex?: number;
    /**
     * The last index of the list. At maximum 500 will be returned
     */
    lastIndex?: number;
}
