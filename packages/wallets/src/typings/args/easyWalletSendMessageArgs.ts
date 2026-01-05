/**
 * Copyright (c) 2025 Signum Network
 * @see {@link EasyWallet.sendMessage}
 * @module wallets
 */
export interface EasyWalletSendMessageArgs {
    /**
     * The recipients address/account Id
     */
    to: string;

    /**
     * The fee to be paid in Signa
     */
    fee?: number;

    /**
     * The _text_ message to be sent
     */
    message?: string;

    /**
     * The _binary_ hexadecimal message to be sent.
     * You can either send a text or hex message, but not both
     */
    hexMessage?: string;

    /**
     * Determines, whether the message will be encrypted, or not.
     * Default is `false`
     */
    encrypt?: boolean;
}
