/* globals window */
import {Wallet} from '../typings';
import {ExtensionAdapter} from './extensionAdapter';
import {ExtensionAdapterFactory} from './extensionAdapterFactory';

interface GenericExtensionWalletConnectArgs {
    onTimeout?: () => void;
    timeoutMillies?: number;
    accountId: string;
    appName: string;
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

    async connect(args: GenericExtensionWalletConnectArgs): Promise<string> {
        const isAvailable = await this.adapter.isWalletAvailable();
        return new Promise(async (resolve, reject) => {

            const requestPermission = async () => {
                return this.adapter.requestPermission({
                    appMeta: {
                        name: args.appName
                    },
                    force: false,
                });
            };

            const {timeoutMillies = 10_000, onTimeout} = args;
            if (isAvailable) {
                const permission = await requestPermission();
                return resolve(permission.pkh);
            }

            const timeoutHandler = setTimeout(() => {
                if (onTimeout) {
                    onTimeout();
                } else {
                    reject('Connection timed out');
                }
            }, timeoutMillies);
            this.adapter.onAvailabilityChange(async (available) => {
                if (available) {
                    clearTimeout(timeoutHandler);
                    const permission = await requestPermission();
                    resolve(permission.pkh);
                }
            });
        });
    }

    confirm(unsignedTransaction: string): Promise<string> {
        return Promise.resolve('');
    }
}
