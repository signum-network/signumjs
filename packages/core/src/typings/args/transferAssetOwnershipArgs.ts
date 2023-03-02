import {DefaultSendArgs} from './defaultSendArgs';


/**
 * The argument object for [[AssetApi.transferAssetOwnership]]
 *
 * @module core
 */
export interface TransferAssetOwnershipArgs extends DefaultSendArgs {
    /**
     * The id of the recipient, i.e. new owner
     */
    recipientId: string;

    /**
     * The full hash of the token issuance transaction
     */
    referencedTransactionFullHash: string;

    /**
     * The _optional_ recipients public key in hex format.
     */
    recipientPublicKey?: string;
}
