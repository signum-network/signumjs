import {ExtensionAdapter} from './extensionAdapter';
import {ExtensionListener} from './extensionListener';
import {ExtensionPermission, ExtensionRequestArgs, ExtensionResponse, ExtensionSentEncryptedMessage, ExtensionSigned} from './messaging';
import {RequestPermissionArgs, RequestSignArgs} from './args';
import {RequestSendEncryptedMessageArgs} from './args/requestSendEncryptedMessageArgs';

/**
 * The extension client for console
 *
 * @note This client is not implemented yet. Extension interaction works only in browser at this time.
 * You might want to use [[DeeplinkableWallet]] to get the deeplinks and open them with https://www.npmjs.com/package/open
 * @module wallets
 */
export class ConsoleExtensionAdapter implements ExtensionAdapter {

    private static notAvailable() {
        return Promise.reject('Not available');
    }

    onNotification(callback: (message: any, listener: ExtensionListener) => void): ExtensionListener {
        throw new Error('Not available');
    }

    getCurrentPermission(): Promise<ExtensionPermission> {
        return ConsoleExtensionAdapter.notAvailable();
    }

    assertWalletAvailable(): Promise<void> {
        return ConsoleExtensionAdapter.notAvailable();
    }

    request(payload: ExtensionRequestArgs): Promise<ExtensionResponse> {
        return ConsoleExtensionAdapter.notAvailable();
    }

    requestPermission(args: RequestPermissionArgs): Promise<ExtensionPermission> {
        return ConsoleExtensionAdapter.notAvailable();
    }

    requestSign(args: RequestSignArgs): Promise<ExtensionSigned> {
        return ConsoleExtensionAdapter.notAvailable();
    }

    requestSendEncryptedMessage(args: RequestSendEncryptedMessageArgs): Promise<ExtensionSentEncryptedMessage> {
        return ConsoleExtensionAdapter.notAvailable();
    }

}
