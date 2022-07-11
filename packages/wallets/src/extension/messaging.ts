/**
 * Original work Copyright (c) 2020 Madfish Solutions
 * Modified work Copyright (c) 2022 Signum Network
 */


/**
 * @ignore
 * @internal
 */
export type ExtensionMessage = ExtensionRequestArgs | ExtensionResponse;

/**
 * @ignore
 * @internal
 */
export type ExtensionRequestArgs =
    | ExtensionGetCurrentPermissionRequest
    | ExtensionPermissionRequest
    | ExtensionSignRequest
    | ExtensionSendEncryptedMessageRequest;

/**
 * @ignore
 * @internal
 */
export type ExtensionResponse =
    | ExtensionGetCurrentPermissionResponse
    | ExtensionPermissionResponse
    | ExtensionSignResponse
    | ExtensionSendEncryptedMessageResponse;


/**
 * @ignore
 * @internal
 */
interface ExtensionMessageBase {
    type: ExtensionMessageType;
}

/**
 * Request/Response Messages
 */

/**
 * @ignore
 * @internal
 */
export enum ExtensionMessageType {
    GetCurrentPermissionRequest = 'GET_CURRENT_PERMISSION_REQUEST',
    GetCurrentPermissionResponse = 'GET_CURRENT_PERMISSION_RESPONSE',
    PermissionRequest = 'PERMISSION_REQUEST',
    PermissionResponse = 'PERMISSION_RESPONSE',
    SignRequest = 'SIGN_REQUEST',
    SignResponse = 'SIGN_RESPONSE',
    SendEncryptedMessageRequest = 'SEND_ENCRYPTED_MSG_REQUEST',
    SendEncryptedMessageResponse = 'SEND_ENCRYPTED_MSG_RESPONSE'
}

/**
 * @ignore
 * @internal
 */
export interface ExtensionGetCurrentPermissionRequest
    extends ExtensionMessageBase {
    type: ExtensionMessageType.GetCurrentPermissionRequest;
}

/**
 * @ignore
 * @internal
 */
export interface ExtensionGetCurrentPermissionResponse
    extends ExtensionMessageBase {
    type: ExtensionMessageType.GetCurrentPermissionResponse;
    permission: ExtensionPermission;
}

/**
 * @ignore
 * @internal
 */
export interface ExtensionPermissionRequest extends ExtensionMessageBase {
    type: ExtensionMessageType.PermissionRequest;
    network: string;
    appMeta: ExtensionDAppMetadata;
    force?: boolean;
}

/**
 * @ignore
 * @internal
 */
export interface ExtensionPermissionResponse extends ExtensionMessageBase {
    type: ExtensionMessageType.PermissionResponse;
    accountId: string;
    publicKey: string;
    availableNodeHosts: string[];
    currentNodeHost: string;
}

/**
 * @ignore
 * @internal
 */
export interface ExtensionSignRequest extends ExtensionMessageBase {
    type: ExtensionMessageType.SignRequest;
    payload: string;
}

/**
 * @ignore
 * @internal
 */
export interface ExtensionSignResponse extends ExtensionMessageBase {
    type: ExtensionMessageType.SignResponse;
    transactionId: string;
    fullHash: string;
}

/**
 * @ignore
 * @internal
 */
export interface ExtensionSendEncryptedMessageRequest extends ExtensionMessageBase {
    type: ExtensionMessageType.SendEncryptedMessageRequest;
    plainMessage: string;
    messageIsText: boolean;
    recipientPublicKey: string;
    feeSigna?: string;
}

/**
 * @ignore
 * @internal
 */
export interface ExtensionSendEncryptedMessageResponse extends ExtensionMessageBase {
    type: ExtensionMessageType.SendEncryptedMessageResponse;
    transactionId: string;
    fullHash: string;
}

/**
 * @ignore
 * @internal
 */
export enum ExtensionErrorType {
    NotGranted = 'NOT_GRANTED',
    NotFound = 'NOT_FOUND',
    InvalidParams = 'INVALID_PARAMS',
    InvalidNetwork = 'INVALID_NETWORK'
}

/**
 * The permission object for a connection
 * @module wallets
 */
export type ExtensionPermission = {
    /**
     * The currently selected node host in the extension
     */
    currentNodeHost: string;
    /**
     * The currently available node hosts for the given network in the extension
     */
    availableNodeHosts: string[];
    /**
     * The account id that is granted by this permission
     */
    accountId: string;
    /**
     * The accounts public key that is granted by this permission
     */
    publicKey: string;
} | null;

/**
 * The response object for successfully signed transactions
 * @module wallets
 */
export type ExtensionSigned = {
    /**
     * The transaction isd
     */
    transactionId: string;
    /**
     * The transactions full hash
     */
    fullHash: string;
} | null;

/**
 * The response object for successfully sent encrypted messages
 * @module wallets
 */
export type ExtensionSentEncryptedMessage = {
    /**
     * The transaction isd
     */
    transactionId: string;
    /**
     * The transactions full hash
     */
    fullHash: string;
} | null;

/**
 * @ignore
 * @internal
 */
export interface ExtensionDAppMetadata {
    name: string;
}


/**
 * @ignore
 * @internal
 */
export interface PageMessage {
    type: PageMessageType;
    payload: any;
    reqId?: string | number;
}


/**
 * @ignore
 * @internal
 */
export enum PageMessageType {
    Request = 'SIGNUM_PAGE_REQUEST',
    Response = 'SIGNUM_PAGE_RESPONSE',
    ErrorResponse = 'SIGNUM_PAGE_ERROR_RESPONSE',
}


// Wallet Notifications

/**
 * @ignore
 * @internal
 */
export enum ExtensionNotificationType {
    NetworkChanged= 'XT_DAPP_NETWORK_CHANGED',
    AccountChanged= 'XT_DAPP_ACCOUNT_CHANGED',
    PermissionRemoved= 'XT_DAPP_PERMISSION_REMOVED',
    AccountRemoved= 'XT_DAPP_ACCOUNT_REMOVED',
}


/**
 * @ignore
 * @internal
 */
interface ExtensionNotificationBase {
    type: ExtensionNotificationType;
}

/**
 * The notification types
 * @module wallets
 */
export type ExtensionNotification =
    | ExtensionNotificationNetworkChanged
    | ExtensionNotificationPermissionRemoved
    | ExtensionNotificationAccountRemoved
    | ExtensionNotificationAccountChanged;


/**
 * The notification message structure for `onNetworkChanged` event
 * @module wallets
 */
export interface ExtensionNotificationNetworkChanged
    extends ExtensionNotificationBase {
    type: ExtensionNotificationType.NetworkChanged;
    /**
     * The new network name
     */
    networkName: string;
    /**
     * The new network host url
     */
    networkHost: string;
}


/**
 * The notification message structure for `onPermissionRemoved` event
 * @module wallets
 */
export interface ExtensionNotificationPermissionRemoved
    extends ExtensionNotificationBase {
    type: ExtensionNotificationType.PermissionRemoved;
    /**
     * The url of the removed permission (representing the related application)
     */
    url: string;
}


/**
 * The notification message structure for `onPermissionRemoved` event
 * @module wallets
 */
export interface ExtensionNotificationAccountRemoved
    extends ExtensionNotificationBase {
    type: ExtensionNotificationType.AccountRemoved;
    /**
     * The id of the account that was removed
     */
    accountId: string;
}

/**
 * The notification message structure for `onPermissionRemoved` event
 * @module wallets
 */
export interface ExtensionNotificationAccountChanged
    extends ExtensionNotificationBase {
    type: ExtensionNotificationType.AccountChanged;
    /**
     * The id of the account that was removed
     */
    accountId: string;
    accountPublicKey: string;
}

