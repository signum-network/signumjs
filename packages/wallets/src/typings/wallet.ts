/**
 * Original work Copyright (c) 2022 Signum Network
 */

/**
 * Generic Wallet interface
 *
 * This is the most generic wallet interface, for generic wallet operations
 *
 * @example
 *
 * ```js
 *  const api = composeApi({nodeHost: 'http://localhost:8125' })
 *  const {privateSignKey} = generateMasterKeys(secret)
 *  const wallet = new MyWallet(api, privateSignKey);
 *  const {transaction} = await wallet.pay({
 *      // your args here
 *  })
 * ```
 *
 * @see [[EasyWallet]] for a slightly more comfortable interface for most common operations
 * @module wallets
 */
export interface Wallet {
    /**
     * Requests confirmation of a transaction
     * This is the most generic operation
     * @param unsignedTransactionBytes The hexadecimal representation of an _unsigned_ transaction
     * You get the _unsigned_ transaction bytes back from the signumjs core method calls, if you do not
     * provide the private signing key.
     */
    confirm(unsignedTransactionBytes: string): Promise<string|void>;

}
