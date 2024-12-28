/**
 * Original work Copyright (c) 2022 Signum Network
 */

import {EasyWalletPayArgs} from './args';

/**
 * A more specific Wallet interface for easier usage.
 *
 * The difference to the generic {@link Wallet} interface is that the
 * easy wallet implements most commonly used methods out of the box
 * and no additional hassle with additional API calls is needed.
 *
 * @example
 *
 * ```js
 *  const api = composeApi({nodeHost: 'http://localhost:8125' })
 *  const {privateSignKey} = generateMasterKeys(secret)
 *  const wallet = new MyEasyWallet(api, privateSignKey);
 *  const {transaction} = await wallet.pay({
 *      // your args here
 *  })
 * ```
 * @module wallets
 */
export interface EasyWallet {

    /**
     * Requests a simple payment
     * @param args The payment args
     * @return
     */
    pay(args: EasyWalletPayArgs): Promise<string|void>;

    // more common actions like message, callContractMethod etc
}
