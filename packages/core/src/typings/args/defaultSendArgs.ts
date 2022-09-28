import {Attachment} from '../attachment';

/**
 * The base argument object for common transactions
 *
 * @module core
 */
export interface DefaultSendArgs {
    /**
     * The fee expressed in Planck
     * @note It's recommended to use [[util.Amount]]
     */
    feePlanck: string;
    /**
     * The senders public key,  i.e. the [[crypto.Keys.publicKey]]
     */
    senderPublicKey: string;
    /**
     * The senders private key, i.e. the [[crypto.Keys.signPrivateKey]]
     * If the private key is not given, then the transaction method will return the unsigned byte string.
     * The transaction won't be processed until the unsigned bytes are being signed and broadcasted using
     * [[TransactionApi.signAndBroadcastTransaction]]
     */
    senderPrivateKey?: string;
    /**
     * An optional attachment
     */
    attachment?: Attachment;
    /**
     * The deadline when after how many minutes the transaction will be discarded, if it was not
     * processed, e.g. due to very low fee
     */
    deadline?: number;

    /**
     * Using this field allows to make a transaction dependent on other transactions.
     */
    referencedTransactionFullHash?: string;
}
