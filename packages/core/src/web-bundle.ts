/**
 * This file is the entry point for web-bundle IIFE build
 * for the core package.
 *
 * It exports all core functionality and ensures crypto is initialized
 * for browser environments.
 *
 * @ignore
 * @internal
 * @module core
 */

// Export all core functionality
export * from './index';

// Initialize crypto for web
import {Crypto} from '@signumjs/crypto';
import {WebCryptoAdapter} from '@signumjs/crypto/adapters';

(() => {
    Crypto.init(new WebCryptoAdapter());
})();
