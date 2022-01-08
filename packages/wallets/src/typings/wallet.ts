import {WalletPayArgs} from './args';

/**
 * Generic Wallet interface
 * @see [[WalletProvider]]
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

    /**
     * Requests a simple payment
     * @param args The payment args
     * @return
     */
    pay(args: WalletPayArgs): Promise<string|void>;

    // TODO: more common actions like message, callContractMethod etc
}
