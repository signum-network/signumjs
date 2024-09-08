
/**
 * The argument object for {@link TransactionApi.signAndBroadcastTransaction}
 *
*
* @category args
*/
export interface UnsignedTransactionArgs {
    unsignedHexMessage: string;
    senderPrivateKey: string;
    senderPublicKey: string;
}
