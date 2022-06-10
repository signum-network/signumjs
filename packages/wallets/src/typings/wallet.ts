/**
 * Original work Copyright (c) 2022 Signum Network
 */

import {ConfirmedTransaction} from './confirmedTransaction';
import {SendEncryptedMessageArgs} from './args';


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

    /**
     * Sends an encrypted P2P message
     *
     * Encrypted messages are only readable by sender and receiver. For encryption the so called agreementPrivateKey of
     * Signums key set is used. Encryption has to be done before the transaction bytes can be generated [[Wallet.confirm]] cannot be used.
     *
     * @param args The parameters
     * @return In case of success the confirmed transaction object, or any contextual string.
     */
    sendEncryptedMessage(args: SendEncryptedMessageArgs): Promise<ConfirmedTransaction|string>;

}
