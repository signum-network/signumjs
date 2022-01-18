import {ExtensionAdapter, ExtensionAdapterListener} from './extensionAdapter';
import {ExtensionPermission, ExtensionRequest, ExtensionResponse, ExtensionSigned} from '../typings/messaging';
import {RequestPermissionArgs, RequestSignArgs} from '../typings';

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

    onAvailabilityChange(callback: (available: boolean, listener: ExtensionAdapterListener) => void): ExtensionAdapterListener {
        throw new Error('Not implemented');
    }

    onPermissionChange(callback: (permission: ExtensionPermission, listener: ExtensionAdapterListener) => void): ExtensionAdapterListener {
        throw new Error('Not implemented');
    }

    getCurrentPermission(): Promise<ExtensionPermission> {
        return ConsoleExtensionAdapter.notImplemented();
    }

    isWalletAvailable(): Promise<boolean> {
        return Promise.resolve(false);
    }

    request(payload: ExtensionRequest): Promise<ExtensionResponse> {
        return ConsoleExtensionAdapter.notImplemented();
    }

    requestPermission(args: RequestPermissionArgs): Promise<ExtensionPermission> {
        return ConsoleExtensionAdapter.notImplemented();
    }

    requestSign(args: RequestSignArgs): Promise<ExtensionSigned> {
        return ConsoleExtensionAdapter.notImplemented();
    }

}
