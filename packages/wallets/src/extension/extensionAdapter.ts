import {ExtensionPermission, ExtensionRequest, ExtensionResponse, ExtensionSigned} from '../typings/messaging';
import {RequestPermissionArgs, RequestSignArgs} from '../typings';

/**
 * @internal
 */
export interface ExtensionAdapterListener {
    unsubscribe: () => void;
}
/**
 *
 * Interface for extension adapters
 *
 * @internal
 */
export interface ExtensionAdapter {
    isWalletAvailable(): Promise<boolean>;

    onAvailabilityChange(callback: (available: boolean, listener: ExtensionAdapterListener) => void): ExtensionAdapterListener;

    onPermissionChange(callback: (permission: ExtensionPermission, listener: ExtensionAdapterListener) => void): ExtensionAdapterListener;

    getCurrentPermission(): Promise<ExtensionPermission>;

    requestPermission(args: RequestPermissionArgs): Promise<ExtensionPermission>;

    requestSign(args: RequestSignArgs): Promise<ExtensionSigned>;

    request(message: ExtensionRequest): Promise<ExtensionResponse>;

}
