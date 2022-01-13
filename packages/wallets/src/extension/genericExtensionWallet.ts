/* globals window */
import {Wallet} from '../typings';
import {ExtensionAdapter} from './extensionAdapter';
import {ExtensionAdapterFactory} from './extensionAdapterFactory';

interface GenericExtensionWalletConnectArgs {
    onTimeout?: () => void;
    timeoutMillies?: number;
}

/**
 * This wallet (proxy) allows interacting with the CIPXX compatible extension wallets.
 *
 * @note At this time, this wallet does only work in the browser
 * @module wallets
 */
export class GenericExtensionWallet implements Wallet {

    /**
     * Instantiates the extension wallet proxy.
     * @param adapter The adapter according your environment. See [[ExtensionAdapterFactory]]. Defaults to BrowserExtensionAdapter
     */
    constructor(private adapter: ExtensionAdapter = ExtensionAdapterFactory.createBrowserAdapter()) {
    }

    async connect(args: GenericExtensionWalletConnectArgs): Promise<boolean> {
        const isAvailable = await this.adapter.isWalletAvailable();
        return new Promise((resolve, reject) => {

            const {timeoutMillies = 10_000, onTimeout} = args;
            if (isAvailable) {
                return resolve(true);
            }

            const timeoutHandler = setTimeout(() => {
                if (onTimeout) {
                    onTimeout();
                } else {
                    reject('Connection timed out');
                }
            }, timeoutMillies);
            this.adapter.onAvailabilityChange((available) => {
                if (available) {
                    clearTimeout(timeoutHandler);
                    resolve(true);
                }
            });
        });
    }

    confirm(unsignedTransaction: string): Promise<string> {
        return Promise.resolve('');
    }
}
