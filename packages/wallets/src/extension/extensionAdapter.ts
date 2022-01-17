import {ExtensionPermission, ExtensionRequest, ExtensionResponse, ExtensionSigned} from '../typings/messaging';
import {RequestPermissionArgs, RequestSignArgs, RequestTransactionArgs} from '../typings';

/**
 *
 * Interface for extension adapters
 *
 * @internal
 */
export interface ExtensionAdapter {
    isWalletAvailable(): Promise<boolean>;

    onAvailabilityChange(callback: (available: boolean) => void);

    onPermissionChange(callback: (permission: ExtensionPermission) => void);

    getCurrentPermission(): Promise<ExtensionPermission>;

    requestPermission(args: RequestPermissionArgs): Promise<ExtensionPermission>;

    // See if we need this?
    requestTransaction(args: RequestTransactionArgs): Promise<any>;

    requestSign(args: RequestSignArgs): Promise<ExtensionSigned>;

    request(message: ExtensionRequest): Promise<ExtensionResponse>;

}
