/**
 * Original work Copyright (c) 2026 Signum Network
 */

/**
 *
 */

/* globals window */

import {src22} from '@signumjs/standards';
import {isNodeJS} from '../isNodeJS';

/**
 * Callback data for 'connect'  command
 */
export interface ConnectCallbackData {
    /**
     * Public key returned from connect callback
     */
    publicKey?: string;
    /**
     * Status from sign callback: 'success' | 'rejected' | 'failed'
     */
    status?: string;
}

/**
 * Callback data for 'sign' command
 */
export interface SignCallbackData {
    /**
     * Status from sign callback: 'success' | 'rejected' | 'failed'
     */
    status?: string;
    /**
     * Transaction ID returned on _successful_ sign
     */
    transactionId?: string;
}

/**
 * The options for the Mobile Wallet
 */
export interface MobileWalletOpts {
    /**
     * If true in browser environment, the method calls will try to open the deep link.
     * If set to false, the methods just return the generated deeplink.
     * In NodeJS this flag will be ignored
     */
    openInBrowser?: boolean;
}

/**
 * Arguments for the connect method
 * {@link MobileWallet.connect}
 */
export interface MobileWalletConnectArgs {
    /**
     * The URL the mobile wallet should redirect to after successful/accepted connection
     */
    callbackUrl: string;
    /**
     * The name of the mobile wallet app
     */
    appName: string;
    /**
     * The network to connect to (mainnet or testnet)
     */
    network: 'mainnet' | 'testnet';
}


/**
 * Arguments for the sign method
 * {@link MobileWallet.sign}
 */
export interface MobileWalletSignArgs {
    /**
     * The unsigned transaction bytes to sign
     */
    unsignedTransactionBytes: string;

    /**
     * The URL the mobile wallet should redirect to after successful/accepted connection
     */
    callbackUrl: string;

    /**
     * The network to connect to (mainnet or testnet)
     */
    network: 'mainnet' | 'testnet';
}

/**
 * This wallet allows interacting with SIP22 compatible mobile wallets via deeplinks.
 *
 * Unlike the DesktopWallet, the MobileWallet uses direct deeplinks (signum://)
 * supports the versatile sign command, and callback URLs for receiving responses from the mobile wallet app.
 */
export class MobileWallet {
    private readonly openInBrowser: boolean;

    constructor(options?: MobileWalletOpts) {
        this.openInBrowser = options?.openInBrowser === undefined ? true : options.openInBrowser;
        if (isNodeJS()) {
            this.openInBrowser = false;
        }
    }

    /**
     * Opens the mobile wallet to request connection and public key.
     * The wallet will redirect to the callback URL with the public key as a URL parameter.
     *
     * Example callbacks:
     *      https://myapp.com/connected
     *      https://myotherapp.com?action=connected
     *
     * In the callback page you can use {@link MobileWallet.parseConnectCallback} to extract the public key
     *
     * @param callbackUrl - The URL the mobile wallet should redirect to after connection
     * @param appName - The name of the dApp
     * @param network - The network to connect to (mainnet or testnet)
     * @returns The deeplink URL (for testing or custom handling)
     */
    connect({callbackUrl, appName, network} : MobileWalletConnectArgs ): string {
        const deeplink = src22.createDeeplink({
            action: 'connect',
            payload: {
                callbackUrl,
                network,
                appName
            }
        });

        if (this.openInBrowser) {
            window?.open(deeplink, '_self', 'noopener noreferrer');
        }

        return deeplink;
    }

    /**
     * Opens the mobile wallet to sign an unsigned transaction.
     * The wallet will redirect to the callback URL with status and transactionId parameters.
     *
     * Example callback on success: https://myapp.com/signed?status=success&transactionId=xyz789...
     * Example callback on rejection: https://myapp.com/signed?status=rejected
     *
     * @returns The deeplink URL (for testing or custom handling)
     */
    sign({network, callbackUrl, unsignedTransactionBytes} : MobileWalletSignArgs): string {
        const deeplink = src22.createDeeplink({
            action: 'sign',
            payload: {
                unsignedTransactionBytes,
                callbackUrl,
                network
            }
        });

        if (this.openInBrowser) {
            window?.open(deeplink, '_self');
        }

        return deeplink;
    }

    /**
     * Static helper to parse callback data from URL parameters.
     * Use this in your callback pages to extract the data sent by the mobile wallet.
     *
     * The returned public key should be stored and used for further signing requests.
     * The public key is required to create unsigned transactions byte sequences.
     *
     * Example usage in callback page:
     * ```typescript
     * const data = MobileWallet.parseCallback();
     * if (data.publicKey) {
     *   localStorage.setItem('signum-wallet-publicKey', data.publicKey);
     * }
     * if (data.status === 'success' && data.transactionId) {
     *   localStorage.setItem('signum-wallet-txId', data.transactionId);
     * }
     * ```
     */
    static parseConnectCallback(): ConnectCallbackData {
        if (typeof window === 'undefined') {
            return {};
        }

        const params = new URLSearchParams(window.location.search);
        return {
            publicKey: params.get('publicKey') || undefined,
        };
    }

    /**
     * Static helper to parse callback data from URL parameters from _sign_ command.
     * Use this in your callback pages to extract the data sent by the mobile wallet.
     */
    static parseSignCallback(): SignCallbackData {
        if (typeof window === 'undefined') {
            return {};
        }

        const params = new URLSearchParams(window.location.search);
        return {
            status: params.get('status') || undefined,
            transactionId: params.get('transactionId') || undefined
        };
    }


}
