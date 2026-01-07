/**
 * Original work Copyright (c) 2022, 2026 Signum Network
 */

/* globals window */

import {src22} from '@signumjs/standards';
import {isNodeJS} from '../isNodeJS';
import {Amount, FeeQuantPlanck} from '@signumjs/util';
import {Address} from '@signumjs/core';


/**
 * The options for the Desktop Wallet (Phoenix)
 */
export interface DesktopWalletOpts {
    /**
     * If true in browser environment, the method calls will try to open the deep link.
     * If set to false, the methods just return the generated deeplink.
     * In NodeJS this flag will be ignored
     */
    openInBrowser?: boolean;
    /**
     * Browsers do not support custom URI protocols, i.e. `signum://`, so they need
     * a redirect proxy instead. Here you can customize your proxy, but its default is
     * set to https://burst-balance-alert.vercel.app/api/redirect?url=
     */
    redirectProxy?: string;
}

/**
 * Arguments for the pay method
 * {@link DesktopWallet.pay}
 */
export interface DesktopWalletPayArgs {
    /**
     * Amount to send.
     */
    amount?: Amount,
    /**
     * Fee
     */
    fee?: Amount,
    /**
     * If true, the message will be encrypted with the recipient's public key.'
     * This requires that the recipient has a public key. Smart Contracts cannot process encrypted messages.
     */
    encrypt?: boolean,
    /**
     * Text message - for binary message use hexMessage
     */
    message?: string,
    /**
     * Hex encoded message (binary message)
     */
    hexMessage?: string,
    /**
     * Id or Address
     */
    recipient?: Address,
    /**
     * Deadline in minutes (Maximum time is kept in mem-pool until it gets removed). Default is 24 hours.
     */
    deadline?: number,

    /**
     * If true, the transaction will be marked as read-only, i.e. application should not make allow any changes to it.
     */
    readonly?: boolean
}



/**
 * This wallet (proxy) allows interacting with SIP22 compatible deep linkable desktop wallets (Phoenix Wallet).
 */
export class DesktopWallet {
    public readonly redirectProxy: string;
    private readonly openInBrowser: boolean;

    constructor(options?: DesktopWalletOpts) {
        this.openInBrowser = options?.openInBrowser === undefined ? true : options.openInBrowser;
        this.redirectProxy = options?.redirectProxy || 'https://burst-balance-alert.vercel.app/api/redirect?url=';
        if (isNodeJS()) {
            this.openInBrowser = false;
        }
    }

    eventuallyOpenInBrowser(url: string): Promise<string> {
        if (this.openInBrowser) {
            window?.open(this.redirectProxy + url, 'SignumJS Deeplinking', 'noopener noreferrer');
        }
        return Promise.resolve(url);
    }

    mountDeeplink(action: string, payload: object): string {
        const link = src22.createDeeplink({
            action,
            payload
        });
        return encodeURIComponent(link);
    }

    /**
     * Confirms a transaction by opening a deeplink for signing.
     *
     * @param {string} unsignedTransactionBytes - The unsigned transaction data in bytes to be confirmed.
     * @return {Promise<string>} A promise that resolves to a string indicating the result of the process.
     */
    confirm(unsignedTransactionBytes: string): Promise<string> {
        return this.eventuallyOpenInBrowser(this.mountDeeplink('sign', {unsignedTransactionBytes}));
    }

    /**
     * Initiates a payment operation with the specified parameters.
     *
     * @param {DesktopWalletPayArgs} args - An object containing the parameters for the payment.
     * @param {Amount} [args.amount=Amount.Zero()] - The amount to be paid, defaulting to zero if not specified.
     * @param {boolean} [args.encrypt=false] - A flag indicating whether the message should be encrypted, defaulting to false.
     * @param {Amount} [args.fee=Amount.fromPlanck(FeeQuantPlanck)] - The transaction fee, defaulting to the defined FeeQuantPlanck.
     * @param {string} [args.message] - An optional plain text message to include with the payment.
     * @param {string} [args.hexMessage] - An optional hexadecimal message to include with the payment if `message` is not provided.
     * @param {Recipient} args.recipient - The recipient of the payment, provided as an object containing their numeric ID.
     * @param {number} [args.deadline=1440] - The deadline for the payment transaction, defaulting to 1440.
     * @param {boolean} [args.readonly=false] - A flag indicating whether the payment should be immutable, defaulting to false.
     * @return {Promise<string>} A promise that resolves to a string representing the final payment deeplink.
     */
    pay(args: DesktopWalletPayArgs): Promise<string> {
        const {
            amount = Amount.Zero(),
            encrypt = false,
            fee = Amount.fromPlanck(FeeQuantPlanck),
            message,
            hexMessage,
            recipient,
            deadline = 1440,
            readonly = false
        } = args;

        const payload = {
            recipient: recipient.getNumericId(),
            amountPlanck: amount.getPlanck(),
            feePlanck: fee.getPlanck(),
            message: message || hexMessage,
            messageIsText: hexMessage === undefined,
            immutable: readonly,
            deadline,
            encrypt
        };

        return this.eventuallyOpenInBrowser(this.mountDeeplink('pay', payload));
    }
}
