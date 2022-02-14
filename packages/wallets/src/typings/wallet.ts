/**
 * Original work Copyright (c) 2022 Signum Network
 */

import {ConfirmedTransaction} from './confirmedTransaction';

/**
 * Generic Wallet interface
 *
 * This is the most generic wallet interface, for generic wallet operations
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
     * @return In case of success the confirmed transaction object, or any contextual string.
     */
    confirm(unsignedTransactionBytes: string): Promise<ConfirmedTransaction|string>;

}
