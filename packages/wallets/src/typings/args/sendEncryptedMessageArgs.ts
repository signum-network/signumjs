/**
 * Copyright (c) 2022 Signum Network
 * @see [[Wallet.sendEncryptedMessage]]
 * @module wallets
 */
export interface SendEncryptedMessageArgs {
    /**
     * The recipients public key. It cannot be the numeric Id, i.e. the receiving account must be activated in the network
     */
    recipientPublicKey: string;
    /**
     * The plain message string, i.e. text, stringified json or other human readable string.
     */
    message?: string;

    /**
     * The _binary_ hexadecimal message to be sent.
     * You can either send a text or hex message, but not both
     */
    hexMessage?: string;

    /**
     * A custom fee in Signa value. You can use this to override automatic calculation.
     */
    feeSigna?: string | number;
}
