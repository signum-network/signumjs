import {ExtensionPermission, ExtensionRequest, ExtensionResponse} from '../typings/messaging';
import {TransactionId} from '@signumjs/core';
import {RequestPermissionArgs, RequestSignArgs, RequestTransactionArgs} from '../typings';

export interface ExtensionAdapter {
    isWalletAvailable(): Promise<boolean>;

    onAvailabilityChange(callback: (available: boolean) => void);

    onPermissionChange(callback: (permission: ExtensionPermission) => void);

    getCurrentPermission(): Promise<ExtensionPermission>;

    requestPermission(args: RequestPermissionArgs): Promise<ExtensionPermission>;

    // See if we need this?
    requestTransaction(args: RequestTransactionArgs): Promise<any>;

    requestSign(args: RequestSignArgs): Promise<TransactionId>;

    request(message: ExtensionRequest): Promise<ExtensionResponse>;

}
