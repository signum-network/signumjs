/* globals window */
import {Amount, FeeQuantPlanck} from '@signumjs/util';
import {EasyWallet, EasyWalletPayArgs} from '../typings';
import {assertAddress} from '../assertAddress';
import {GenericDeeplinkableWallet} from './GenericDeeplinkableWallet';
import {DeeplinkableWalletOptions} from './deepLinkableOptions';
import {Address, Api} from '@signumjs/core';


/**
 * This wallet (proxy) allows interacting with CIP22 compatible deep linkable wallets.
 *
 * The call of one its methods in nodejs just returns the generated urls, while in browser (also mobile) environments
 * it tries to open the deep link and though the wallet if installed on the system.
 *
 * @module wallets
 */
export class DeeplinkableWallet extends GenericDeeplinkableWallet implements EasyWallet {
    constructor(api: Api, sender: Address, options?: DeeplinkableWalletOptions) {
        super(options);
    }

    pay(args: EasyWalletPayArgs): Promise<string> {
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
