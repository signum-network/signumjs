/**
 * Original work Copyright (c) 2022 Signum Network
 */

import {ExtensionListener} from './extensionListener';
import {
    ExtensionPermission,
    ExtensionRequestArgs,
    ExtensionResponse,
    ExtensionSentEncryptedMessage,
    ExtensionSigned
} from './messaging';
import {RequestPermissionArgs, RequestSignArgs} from './args';
import {RequestSendEncryptedMessageArgs} from './args/requestSendEncryptedMessageArgs';

/**
 *
 * Interface for extension adapters
 *
 * @internal
 */
export interface ExtensionAdapter {
    assertWalletAvailable(): Promise<void>;

    onNotification(callback: (message: any) => void): ExtensionListener;

    getCurrentPermission(): Promise<ExtensionPermission>;

    requestPermission(args: RequestPermissionArgs): Promise<ExtensionPermission>;

    requestSign(args: RequestSignArgs): Promise<ExtensionSigned>;

    requestSendEncryptedMessage(args: RequestSendEncryptedMessageArgs): Promise<ExtensionSentEncryptedMessage>;

    request(message: ExtensionRequestArgs): Promise<ExtensionResponse>;

}
