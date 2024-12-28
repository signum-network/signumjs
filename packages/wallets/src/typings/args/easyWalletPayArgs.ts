/**
 * Copyright (c) 2022 Signum Network
 * @see {@link EasyWallet.pay}
 * @module wallets
 */
export interface EasyWalletPayArgs {
    /**
     * The recipients address/account Id
     */
    to: string;

    /**
     * The amount in Signa to be paid
     */
    amount?: number;

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

    /**
     * The deadline in minutes until the payment will be removed from mem pool, if it is not processed yet
     * Defaults to 1440 (maximum)
     */
    deadline?: number;

    /**
     * Decides whether the send form on the wallet should be editable or not.
     * Defaults to false
     */
    readonly?: boolean;
}
