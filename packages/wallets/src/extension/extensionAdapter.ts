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

    onAvailabilityChange(callback: (available: boolean, listener: ExtensionListener) => void): ExtensionListener;

    onPermissionChange(callback: (permission: ExtensionPermission, listener: ExtensionListener) => void): ExtensionListener;

    getCurrentPermission(): Promise<ExtensionPermission>;

    requestPermission(args: RequestPermissionArgs): Promise<ExtensionPermission>;

    requestSign(args: RequestSignArgs): Promise<ExtensionSigned>;

    request(message: ExtensionRequest): Promise<ExtensionResponse>;

}
