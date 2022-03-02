/**
 * Original work Copyright (c) 2022 Signum Network
 */

import {ExtensionListener} from './extensionListener';
import {ExtensionPermission, ExtensionRequestArgs, ExtensionResponse, ExtensionSigned} from './messaging';
import {RequestPermissionArgs, RequestSignArgs} from './args';

/**
 *
 * Interface for extension adapters
 *
 * @internal
 */
export interface ExtensionAdapter {
    isWalletAvailable(): Promise<boolean>;

    onNotification(callback: (message: any) => void): ExtensionListener;

    getCurrentPermission(): Promise<ExtensionPermission>;

    requestPermission(args: RequestPermissionArgs): Promise<ExtensionPermission>;

    requestSign(args: RequestSignArgs): Promise<ExtensionSigned>;

    request(message: ExtensionRequestArgs): Promise<ExtensionResponse>;

}
