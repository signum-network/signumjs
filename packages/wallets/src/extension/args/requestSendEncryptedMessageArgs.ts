/**
 * Arguments for {@link ExtensionAdapter.requestSign}
 * @internal
 */
export interface RequestSendEncryptedMessageArgs {
    plainMessage: string;
    messageIsText: boolean;
    recipientPublicKey: string;
    feeSigna?: string;
}
