import {ExtensionErrorType} from './messaging';

/**
 * A generic and unknown/unexpected error with the extension
 */
export class ExtensionWalletError implements Error {
    name = 'ExtensionWalletError';
    message = 'An unknown error occured. Please try again or report it';
}

/**
 * Error for rejected permissions, or similar permission errors
 */
export class NotGrantedWalletError extends ExtensionWalletError {
    name = 'NotGrantedWalletError';
    message = 'Permission Not Granted';
}

/**
 * Error if no compatible extension wallet was found
 */
export class NotFoundWalletError extends ExtensionWalletError {
    name = 'NotFoundWalletError';
    message = 'Could not find a compatible wallet';
}

/**
 * Error if request parameters do not match expectation of the wallet
 */
export class InvalidParamsWalletError extends ExtensionWalletError {
    name = 'InvalidParamsWalletError';
    message = 'Some of the parameters you provided are invalid';
}

/**
 * Error if the network is not allowed for the requesting application, i.e. requested network does not exist, or the currently selected node is not
 * of requested network.
 */
export class InvalidNetworkError extends ExtensionWalletError {
    name = 'InvalidNetworkError';
    message = 'The selected network/node of the wallet does not match the applications required network. Please select another network/node in your wallet';
}

/**
 * @internal
 * @ignore
 */
export function createError(payload: ExtensionErrorType): ExtensionWalletError {
    switch (payload) {
        case ExtensionErrorType.NotGranted:
            return new NotGrantedWalletError();

        case ExtensionErrorType.NotFound:
            return new NotFoundWalletError();

        case ExtensionErrorType.InvalidParams:
            return new InvalidParamsWalletError();

        case ExtensionErrorType.InvalidNetwork:
            return new InvalidNetworkError();

        default:
            return new ExtensionWalletError();
    }
}
