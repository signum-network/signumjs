/**
 * Original work Copyright (c) 2022, 2026 Signum Network
 */

/* globals window */
import {ExtensionWalletConnection} from './extensionWalletConnection';
import {BrowserExtensionAdapter} from './browserExtensionAdapter';

/**
 * Arguments for {@link ExtensionWallet.sendEncryptedMessage}
 */
export interface SendEncryptedMessageArgs {
    /**
     * The fee in signa.
     */
    feeSigna: number | string,
    /**
     * The public key of the recipient.
     */
    recipientPublicKey: string,
    /**
     * The message to be sent.
     */
    message?: string,
    /**
     * The hex message to be sent - as alternative to `message`.
     */
    hexMessage?: string,
}

/**
 * Object returned from {@link ExtensionWallet.confirm}
 */
export interface ConfirmedTransaction {
    /**
     * The transaction id
     */
    transactionId: string;
    /**
     * The hash of the transaction
     */
    fullHash: string;
}


/**
 * Connection parameters for {@link ExtensionWallet.connect}
 */
export interface ExtensionWalletConnectArgs {
    /**
     * The name of the app to be connected.
     */
    appName: string;

    /**
     * The name of the network to be used.
     * The network name is available with `getNetworkInfo`.
     * For original Signum Network it is `Signum` and `Signum-TESTNET` respectively.
     */
    networkName: string | 'Signum' | 'Signum-TESTNET';
}

/**
 * This wallet (proxy) allows interacting with the CIPXX compatible extension wallets.
 *
 * @example
 *
 * ```js
 *  const wallet = new ExtensionWallet()
 *  wallet
 *  .connect({appName: 'MySuperDApp', networkName: NetworkName.SignumMainnet})
 *  .then( connection => {
 *      console.log('Successfully connected', connection)
 *      const ledger = LedgerClientFactory.createClient({ nodeHost: connection.currentNodeHost });
 *      console.log('Sending some money...')
 *      return ledger.transaction.sendAmountToSingleRecipient({
 *          senderPublicKey: connection.publicKey,
 *          recipientId: Address.fromReedSolomonAddress('TS-K37B-9V85-FB95-793HN').getNumericId(),
 *          feePlanck: String(FeeQuantPlanck),
 *          amountPlanck: Amount.fromSigna(1).getPlanck()
 *      })
 *  })
 *  .then( unsignedTransaction => {
 *      return wallet.confirm(unsignedTransaction.unsignedTransactionBytes)
 *  })
 *  .then( confirmedTransaction => {
 *      console.log('Successfully sent money:', confirmedTransaction)
 *  }).catch(console.error)
 * ```
 *
 * > At this time, this wallet does only work in the browser
 */
export class ExtensionWallet {

    private _connection: ExtensionWalletConnection | null = null;
    private adapter = new BrowserExtensionAdapter();

    private assertConnection() {
        if (!this.connection) {
            throw new Error('Wallet not connected');
        }
    }

    private async fetchPermission(network: string, appName: string): Promise<ExtensionWalletConnection> {
        try {
            const {availableNodeHosts, accountId, publicKey, currentNodeHost, watchOnly} = await this.adapter.requestPermission({
                network: network,
                appMeta: {
                    name: appName
                },
            });

            return new ExtensionWalletConnection(
                accountId,
                publicKey,
                watchOnly,
                availableNodeHosts,
                currentNodeHost,
                this.adapter);
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    /**
     * @return the current connection, iff exists
     */
    get connection(): ExtensionWalletConnection | null {
        return this._connection;
    }

    /**
     * Tries to connect to the extension wallet. Each recurring call tries overwrites current connection
     * @param args The argument object
     * @return The connection if successful, or null, if not available
     * @throws Errors on unavailability, wrong networks or permission issues
     */
    async connect(args: ExtensionWalletConnectArgs): Promise<ExtensionWalletConnection> {
        this._connection = null;
        await this.adapter.assertWalletAvailable();
        const {appName, networkName} = args;
        this._connection = await this.fetchPermission(networkName, appName);
        return this._connection;
    }

    /**
     * Requests a confirmation, i.e. cryptographic signing, of a transaction.
     *
     * The unsignedTransaction byte sequence is being returned by any of the SignumJS operations as long as no private key is
     * passed as parameter to the operation
     *
     * @example
     * ```ts
     * const { unsignedTransactionBytes } = await ledger.transaction.sendAmountToSingleRecipient({
     *          senderPublicKey: connection.publicKey, // only public key is passed!
     *          recipientId: Address.fromReedSolomonAddress('TS-K37B-9V85-FB95-793HN').getNumericId(),
     *          feePlanck: String(FeeQuantPlanck),
     *          amountPlanck: Amount.fromSigna(1).getPlanck()
     *      })
     * const { transactionId, fullHash } = await wallet.confirm(unsignedTransactionBytes)
     * ```
     * @param unsignedTransaction The hexadecimal byte string of an unsigned transaction.
     * @return The confirmed transaction, in case of success
     * @throws Error if signing failed for some reason, i.e. rejected operation or invalid transaction data
     */
    async confirm(unsignedTransaction: string): Promise<ConfirmedTransaction> {
        this.assertConnection();
        const result = await this.adapter.requestSign({
            unsignedTransaction,
        });
        return {...result};
    }

    /**
     * Requests to send an encrypted P2P message via the extension
     *
     * @param args The send parameters
     * @return The confirmed transaction, in case of success
     * @throws Error if signing failed for some reason, i.e. rejected operation or invalid transaction data
     */
    async sendEncryptedMessage(args: SendEncryptedMessageArgs): Promise<ConfirmedTransaction> {
        this.assertConnection();
        const feeSigna = args.feeSigna === 'number' ? args.feeSigna.toString() : args.feeSigna as string;
        const result = await this.adapter.requestSendEncryptedMessage({
            plainMessage: args.message || args.hexMessage,
            messageIsText: !!args.message,
            recipientPublicKey: args.recipientPublicKey,
            feeSigna,
        });
        return {...result};
    }

}
