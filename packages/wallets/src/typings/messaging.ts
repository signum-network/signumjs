/**
 * Original work Copyright (c) 2020 Madfish Solutions
 * Modified work Copyright (c) 2022 Signum Network
 */

export type ExtensionMessage = ExtensionRequest | ExtensionResponse;

export type ExtensionRequest =
    | ExtensionGetCurrentPermissionRequest
    | ExtensionPermissionRequest
    | ExtensionSignRequest;

export type ExtensionResponse =
    | ExtensionGetCurrentPermissionResponse
    | ExtensionPermissionResponse
    | ExtensionSignResponse;


export interface ExtensionMessageBase {
    type: ExtensionMessageType;
}

/**
 * Request/Response Messages
 */

export enum ExtensionMessageType {
    GetCurrentPermissionRequest = 'GET_CURRENT_PERMISSION_REQUEST',
    GetCurrentPermissionResponse = 'GET_CURRENT_PERMISSION_RESPONSE',
    PermissionRequest = 'PERMISSION_REQUEST',
    PermissionResponse = 'PERMISSION_RESPONSE',
    SignRequest = 'SIGN_REQUEST',
    SignResponse = 'SIGN_RESPONSE',
}

export interface ExtensionGetCurrentPermissionRequest
    extends ExtensionMessageBase {
    type: ExtensionMessageType.GetCurrentPermissionRequest;
}

export interface ExtensionGetCurrentPermissionResponse
    extends ExtensionMessageBase {
    type: ExtensionMessageType.GetCurrentPermissionResponse;
    permission: ExtensionPermission;
}

export interface ExtensionPermissionRequest extends ExtensionMessageBase {
    type: ExtensionMessageType.PermissionRequest;
    network: string;
    appMeta: ExtensionDAppMetadata;
    force?: boolean;
}

export interface ExtensionPermissionResponse extends ExtensionMessageBase {
    type: ExtensionMessageType.PermissionResponse;
    accountId: string;
    publicKey: string;
    nodeHosts: string[];
}

export interface ExtensionSignRequest extends ExtensionMessageBase {
    type: ExtensionMessageType.SignRequest;
    sourcePkh: string;
    payload: string;
}

export interface ExtensionSignResponse extends ExtensionMessageBase {
    type: ExtensionMessageType.SignResponse;
    transactionId: string;
    fullHash: string;
}

export enum ExtensionErrorType {
    NotGranted = 'NOT_GRANTED',
    NotFound = 'NOT_FOUND',
    InvalidParams = 'INVALID_PARAMS',
    Operation = 'OPERATION',
}

export type ExtensionPermission = {
    nodeHosts: string[];
    accountId: string;
    publicKey: string;
} | null;


export type ExtensionSigned = {
    transactionId: string;
    fullHash: string;
} | null;

export interface ExtensionDAppMetadata {
    name: string;
}

export interface PageMessage {
    type: PageMessageType;
    payload: any;
    reqId?: string | number;
}

export enum PageMessageType {
    Request = 'SIGNUM_PAGE_REQUEST',
    Response = 'SIGNUM_PAGE_RESPONSE',
    ErrorResponse = 'SIGNUM_PAGE_ERROR_RESPONSE',
}


// Wallet Notifications

export enum ExtensionNotificationType {
    NetworkChanged= 'XT_DAPP_NETWORK_CHANGED',
    PermissionRemoved= 'XT_DAPP_PERMISSION_REMOVED'
}

export interface ExtensionNotificationBase {
    type: ExtensionNotificationType;
}

export type ExtensionNotification =
    | ExtensionNotificationNetworkChanged
    | ExtensionNotificationPermissionRemoved;

export interface ExtensionNotificationNetworkChanged
    extends ExtensionNotificationBase {
    type: ExtensionNotificationType.NetworkChanged;
    networkName: string;
    networkHost: string;
}

export interface ExtensionNotificationPermissionRemoved
    extends ExtensionNotificationBase {
    type: ExtensionNotificationType.PermissionRemoved;
}

