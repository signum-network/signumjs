/**
 * Original work Copyright (c) 2022 Signum Network
 */

import {src22} from '@signumjs/standards';
/* globals window */
import {SendEncryptedMessageArgs, Wallet} from '../typings';
import {isNodeJS} from '../isNodeJS';

/**
 * The options for the Deeplinkable Wallet
 * @module wallets
 */
interface DeeplinkableWalletOpts {
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
 * This wallet (proxy) allows interacting with SIP22 compatible deep linkable wallets.
 *
 * The call of one its methods in nodejs just returns the generated urls, while in browser (also mobile) environments
 * it tries to open the deep link and though the wallet if installed on the system.
 *
 * @module wallets
 */
export class GenericDeeplinkableWallet implements Wallet {
    public readonly redirectProxy: string;
    private readonly openInBrowser: boolean;

    constructor(options?: DeeplinkableWalletOpts) {
        this.openInBrowser = options?.openInBrowser === undefined ? true : options.openInBrowser;
        this.redirectProxy = options?.redirectProxy || 'https://burst-balance-alert.vercel.app/api/redirect?url=';
        if (isNodeJS()) {
            this.openInBrowser = false;
        }
    }

    protected eventuallyOpenInBrowser(url: string): Promise<string> {
        if (this.openInBrowser) {
            // @ts-ignore
            window.open(url, 'SignumJS Deeplinking', 'noopener noreferrer');
        }
        return Promise.resolve(url);
    }


    protected mountDeeplink(action: string, payload: object): string {
        const link = src22.createDeeplink({
            action,
            payload
        });
        return this.redirectProxy + encodeURIComponent(link);
    }

    confirm(unsignedTransaction: string): Promise<string> {
        return this.eventuallyOpenInBrowser(this.mountDeeplink('confirm', {unsignedTransaction}));
    }

    sendEncryptedMessage(_args: SendEncryptedMessageArgs): Promise<string> {
        return Promise.reject(new Error('Not supported yet'));
    }
}
