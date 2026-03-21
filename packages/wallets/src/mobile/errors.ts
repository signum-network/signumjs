/**
 * Represents a custom error specific to mobile wallet operations.
 *
 * This error is used to handle exceptions that occur during
 * mobile wallet processing or functionality.
 *
 * @extends {Error}
 */
export class MobileWalletError extends Error {
    name = 'MobileWalletError';
}

