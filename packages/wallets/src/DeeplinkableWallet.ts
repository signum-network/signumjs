/* globals window */
import {WalletPayArgs, Wallet} from './typings';
import {isNodeJS} from './isNodeJS';
import {Amount, createDeeplink, FeeQuantPlanck} from '@signumjs/util';
import {assertAddress} from './assertAddress';

/**
 * The options for the Deeplinkable Wallet
 */
interface DeeplinkableWalletOpts {
    /**
     * If true in browser environment, the method calls will try to open the deep link.
     * If set to false, the methods just return the generated deeplink.
     * In NodeJS this flag will be ignored
     */
    openInBrowser?: boolean;
    /**
     * Browser do not support custom URI protocols, i.e. `signum://`, so they need
     * a redirect proxy instead. Here you can customize your proxy, but its default is
     * set to https://burst-balance-alert.vercel.app/api/redirect?url=
     */
    redirectProxy?: string;
}

/**
 * This wallet (proxy) allows interacting with CIP22 compatible deep linkable wallets.
 *
 * The call of one its methods in nodejs just returns the generated urls, while in browser (also mobile) environments
 * it tries to open the deep link and though the wallet if installed on the system.
 *
 * @module wallets
 */
export class DeeplinkableWallet implements Wallet {
    public readonly redirectProxy: string;
    private readonly openInBrowser: boolean;

    constructor(options?: DeeplinkableWalletOpts) {
        this.openInBrowser = options?.openInBrowser === undefined ? true : options.openInBrowser;
        this.redirectProxy = options?.redirectProxy || 'https://burst-balance-alert.vercel.app/api/redirect?url=';
        if (isNodeJS()) {
            this.openInBrowser = false;
        }
    }

    private eventuallyOpenInBrowser(url: string): Promise<string> {
        if (this.openInBrowser) {
            // @ts-ignore
            window.open(url, 'SignumJS Deeplinking', 'noopener noreferrer');
        }
        return Promise.resolve(url);
    }


    private mountDeeplink(action: string, payload: object) : string {
        const link = createDeeplink({
            action,
            payload
        });
        return this.redirectProxy + encodeURIComponent(link);
    }

    confirm(unsignedTransaction: string): Promise<string> {
        return this.eventuallyOpenInBrowser(this.mountDeeplink('confirm', {unsignedTransaction}));
    }

    pay(args: WalletPayArgs): Promise<string> {
        const {
            amount = '0',
            encrypt = false,
            fee = FeeQuantPlanck / 1e8,
            message,
            hexMessage,
            to,
            deadline = 1440,
            readonly = false
        } = args;

        assertAddress(to);

        const payload = {
            recipient: to,
            amountPlanck: Amount.fromSigna(amount).getPlanck(),
            feePlanck: Amount.fromSigna(fee).getPlanck(),
            message: message || hexMessage,
            messageIsText: hexMessage === undefined,
            immutable: readonly,
            deadline,
            encrypt
        };

        return this.eventuallyOpenInBrowser(this.mountDeeplink('pay', payload));
    }
}
