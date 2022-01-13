import {ExtensionErrorType} from '../typings/messaging';

export class ExtensionWalletError implements Error {
    name = 'ExtensionWalletError';
    message = 'An unknown error occured. Please try again or report it';
}

export class NotGrantedWalletError extends ExtensionWalletError {
    name = 'NotGrantedWalletError';
    message = 'Permission Not Granted';
}

export class NotFoundWalletError extends ExtensionWalletError {
    name = 'NotFoundWalletError';
    message = 'Account Not Found. Try connect again';
}

export class InvalidParamsWalletError extends ExtensionWalletError {
    name = 'InvalidParamsWalletError';
    message = 'Some of the parameters you provided are invalid';
}

export function createError(payload: any) {
    switch (true) {
        case payload === ExtensionErrorType.NotGranted:
            return new NotGrantedWalletError();

        case payload === ExtensionErrorType.NotFound:
            return new NotFoundWalletError();

        case payload === ExtensionErrorType.InvalidParams:
            return new InvalidParamsWalletError();

        // case Array.isArray(payload) &&
        // payload[0] === ExtensionErrorType.TezosOperation &&
        // Array.isArray(payload[1]) &&
        // payload[1].length > 0:
        //     return new TezosOperationError(payload[1]);

        // case typeof payload === 'string' && payload.startsWith('__tezos__'):
        //     return new Error(payload.replace('__tezos__', ''));

        default:
            return new ExtensionWalletError();
    }
}
