/**
 * Original work Copyright (c) 2022 Signum Network
 */

/* globals window */
import {ConfirmedTransaction, Wallet} from '../typings';
import {ExtensionAdapter} from './extensionAdapter';
import {ExtensionAdapterFactory} from './extensionAdapterFactory';
import {WalletConnection} from './walletConnection';
import {NotGrantedWalletError} from './errors';

interface GenericExtensionWalletConnectArgs {
    /**
     * The name of the app to be connected.
     */
    appName: string;

    /**
     * Determines the node (via URL) to be connected to
     */
    nodeHost: string;
    /**
     * Optional timeout handler, that will be called, if connection to the wallet was timed out.
     * If not given, an exception will be thrown on timeout instead
     */
    onTimeout?: () => void;
    /**
     * Optional timeout limit in milliseconds. Default: 10_000 Millies
     * If set to -1, no retrial is executed
     */
    timeoutMillies?: number;
}

/**
 * This wallet (proxy) allows interacting with the CIPXX compatible extension wallets.
 *
 * @example
 *
 * ```js
 *  const wallet = new GenericExtensionWallet()
 *  wallet
 *  .connect({appName: 'MySuperDApp'})
 *  .then( connection => {
 *      console.log('Successfully connected', connection)
 *      const ledger = LedgerClientFactory.createClient({ nodeHost: connection.nodeHost });
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
 * @note At this time, this wallet does only work in the browser
 * @module wallets
 */
export class GenericExtensionWallet implements Wallet {

    private _connection: WalletConnection | null = null;

    /**
     * Instantiates the extension wallet proxy.
     * @param adapter The adapter according your environment. See [[ExtensionAdapterFactory]].
     * It uses the default [[ExtensionAdapterFactory]] to determine the correct adapter.
     */
    constructor(private adapter: ExtensionAdapter = ExtensionAdapterFactory.getAdapter()) {
    }

    private assertConnection() {
        if (!this.connection) {
            throw new Error('Wallet not connected');
        }
    }

    private async fetchPermission(networkRpc: string, appName: string) {
        try {
            const {rpc, pkh, publicKey} = await this.adapter.requestPermission({
                network: networkRpc,
                appMeta: {
                    name: appName
                },
                force: false,
            });

            this._connection = new WalletConnection(pkh, publicKey, rpc, this.adapter);
            return this._connection;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    /**
     * @return the current connection, iff exists
     */
    get connection(): WalletConnection | null {
        return this._connection;
    }

    /**
     * Tries to connect to the extension wallet.
     * @param args The argument object
     * @throws Errors on timeout (if no explicit timeout handler was set), or on Permission issues
     */
    async connect(args: GenericExtensionWalletConnectArgs): Promise<WalletConnection> {
        const isAvailable = await this.adapter.isWalletAvailable();
        const {timeoutMillies = 10_000, onTimeout, appName, nodeHost} = args;
        let permission = null;
        if (isAvailable) {
            permission = await this.fetchPermission(nodeHost, appName);
        }
        return permission || new Promise(async (resolve, reject) => {
                let timeoutHandler = null;
                if (timeoutMillies === -1 && !permission) {
                    return reject('Wallet not reachable');
                }
                const listener = this.adapter.onAvailabilityChange(async (available) => {
                    if (!available) {
                        return;
                    }
                    try {
                        permission = permission = await this.fetchPermission(nodeHost, appName);
                        if (permission) {
                            clearTimeout(timeoutHandler);
                            listener.unlisten();
                            resolve(permission);
                        }
                    } catch (e) {
                        reject(e);
                    }
                });
                timeoutHandler = setTimeout(() => {
                    listener.unlisten();
                    if (onTimeout) {
                        onTimeout();
                    } else {
                        reject('Connection timed out');
                    }
                }, timeoutMillies);
            }
        );
    }

    async confirm(unsignedTransaction: string): Promise<ConfirmedTransaction> {
        this.assertConnection();
        const result = await this.adapter.requestSign({
            unsignedTransaction,
            accountId: this.connection?.accountId || ''
        });
        return {
            transactionId: result.transactionId,
            fullHash: result.fullHash
        };
    }
}
