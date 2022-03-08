/**
 * Arguments for [[ExtensionAdapter.requestSign]]
 * @internal
 * @module wallets
 */
export interface RequestSignArgs {
    publicKey: string;
    unsignedTransaction: string;
}
