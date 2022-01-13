import {ExtensionAdapter} from './extensionAdapter';
import {ExtensionPermission, ExtensionRequest, ExtensionResponse} from '../typings/messaging';
import {RequestPermissionArgs, RequestSignArgs, RequestTransactionArgs} from '../typings';
import {TransactionId} from '@signumjs/core';

/**
 * The extension client for console
 *
 * @note This client is not implemented yet. Extension interaction works only in browser at this time.
 * You might want to use [[DeeplinkableWallet]] to get the deeplinks and open them with https://www.npmjs.com/package/open
 */
export class ConsoleExtensionAdapter implements ExtensionAdapter {

    private static notImplemented() {
        return Promise.reject('Not implemented');
    }

    getCurrentPermission(): Promise<ExtensionPermission> {
        return ConsoleExtensionAdapter.notImplemented();
    }

    isWalletAvailable(): Promise<boolean> {
        return Promise.resolve(false);
    }

    onAvailabilityChange(callback: (available: boolean) => void) {
        return ConsoleExtensionAdapter.notImplemented();
    }

    onPermissionChange(callback: (permission: ExtensionPermission) => void) {
        return ConsoleExtensionAdapter.notImplemented();
    }

    request(payload: ExtensionRequest): Promise<ExtensionResponse> {
        return ConsoleExtensionAdapter.notImplemented();
    }

    requestPermission(args: RequestPermissionArgs): Promise<ExtensionPermission> {
        return ConsoleExtensionAdapter.notImplemented();
    }

    requestSign(args: RequestSignArgs): Promise<TransactionId> {
        return ConsoleExtensionAdapter.notImplemented();
    }

    requestTransaction(args: RequestTransactionArgs): Promise<any> {
        return Promise.resolve(undefined);
    }

}
