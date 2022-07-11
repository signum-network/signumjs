/**
 * Arguments for [[ExtensionAdapter.requestSign]]
 * @internal
 * @module wallets
 */
export interface RequestSendEncryptedMessageArgs {
    plainMessage: string;
    messageIsText: boolean;
    recipientPublicKey: string;
    feeSigna?: string;
}
