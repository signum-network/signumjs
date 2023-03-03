/** @ignore */
/** @internal */
export interface BaseTransaction {
    type?: number;
    version?: number;
    subtype?: number;
    timestamp?: number;
    deadline?: number;
    senderPublicKey?: string;
    sender?: string;
    recipient?: string;
    amountNQT?: string;
    feeNQT?: string;
    referencedTransactionFullHash?: string;
    signature?: string;
    flags?: number;
    ecBlockHeight?: number;
    ecBlockId?: string;
    cashBackId?: string;
}
