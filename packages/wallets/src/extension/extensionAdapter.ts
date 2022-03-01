import {ExtensionPermission, ExtensionRequest, ExtensionResponse, ExtensionSigned} from '../typings/messaging';
import {RequestPermissionArgs, RequestSignArgs} from '../typings';
import {ExtensionListener} from './extensionListener';

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

    request(message: ExtensionRequest): Promise<ExtensionResponse>;

}
