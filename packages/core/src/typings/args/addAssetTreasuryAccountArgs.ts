import {DefaultSendArgs} from './defaultSendArgs';


/**
 * The argument object for {@link AssetApi.addAssetTreasuryAccount}
 *
 * @category args
 */
export interface AddAssetTreasuryAccountArgs extends DefaultSendArgs {
    /**
     * The account to be added
     */
    accountId: string;
    /**
     * The full hash of the transaction of issued asset. It's a hexadecimal value
     */
    referencedTransactionFullHash: string;
    /**
     * You may send a public key of the recipient, this might even "activate" the account.
     */
    recipientPublicKey?: string;
}
