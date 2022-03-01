/**
 * Original work Copyright (c) 2022 Signum Network
 */

/* globals window */
import {ConfirmedTransaction, Wallet} from '../typings';
import {ExtensionAdapter} from './extensionAdapter';
import {ExtensionAdapterFactory} from './extensionAdapterFactory';
import {WalletConnection} from './walletConnection';

export enum NetworkName {
    SignumMainnet = 'Signum',
    SignumTestnet = 'Signum-TESTNET'
}

interface GenericExtensionWalletConnectArgs {
    /**
     * The name of the app to be connected.
     */
    appName: string;

    /**
     * The name of the network to be used.
     * The network name is available with `getNetworkInfo`.
     * For original Signum Network it is `Signum` and `Signum-TESTNET` respectively.
     */
    networkName: string | NetworkName;
}

/**
 * This wallet (proxy) allows interacting with the CIPXX compatible extension wallets.
 *
 * @example
 *
 * ```js
 *  const wallet = new GenericExtensionWallet()
 *  wallet
 *  .connect({appName: 'MySuperDApp', networkName: NetworkName.SignumMainnet})
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

    private async fetchPermission(network: string, appName: string) {
        try {
            const {nodeHosts, accountId, publicKey} = await this.adapter.requestPermission({
                network: network,
                appMeta: {
                    name: appName
                },
                force: false,
            });

            this._connection = new WalletConnection(accountId, publicKey, nodeHosts, this.adapter);
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
        const {appName, networkName} = args;
        let permission = null;
        if (isAvailable) {
            permission = await this.fetchPermission(networkName, appName);
        }
        return permission;
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
