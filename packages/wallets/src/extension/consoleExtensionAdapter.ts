import {ExtensionAdapter} from './extensionAdapter';
import {ExtensionListener} from './extensionListener';
import {ExtensionPermission, ExtensionRequestArgs, ExtensionResponse, ExtensionSigned} from './messaging';
import {RequestPermissionArgs, RequestSignArgs} from './args';

/**
 * The extension client for console
 *
 * @note This client is not implemented yet. Extension interaction works only in browser at this time.
 * You might want to use [[DeeplinkableWallet]] to get the deeplinks and open them with https://www.npmjs.com/package/open
 * @module wallets
 */
export class ConsoleExtensionAdapter implements ExtensionAdapter {

    private static notImplemented() {
        return Promise.reject('Not implemented');
    }

    onNotification(callback: (message: any, listener: ExtensionListener) => void): ExtensionListener {
        throw new Error('Not implemented');
    }

    getCurrentPermission(): Promise<ExtensionPermission> {
        return ConsoleExtensionAdapter.notImplemented();
    }

    isWalletAvailable(): Promise<boolean> {
        return Promise.resolve(false);
    }

    request(payload: ExtensionRequestArgs): Promise<ExtensionResponse> {
        return ConsoleExtensionAdapter.notImplemented();
    }

    requestPermission(args: RequestPermissionArgs): Promise<ExtensionPermission> {
        return ConsoleExtensionAdapter.notImplemented();
    }

    requestSign(args: RequestSignArgs): Promise<ExtensionSigned> {
        return ConsoleExtensionAdapter.notImplemented();
    }

}
