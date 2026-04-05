import {CryptoAdapter} from '../typings/cryptoAdapter';
import {CryptoError} from '../typings/cryptoError';

const GLOBAL_KEY = '__signumjs_crypto_adapter__';

/**
 * Unified Low-Level Crypto Class for common crypto operations needed for Signum.
 *
 * IMPORTANT: Before using any of the crypto functions {@link init()} needs to be called once
 *
 * Usually, you want to use the comfort functions like
 * {@link encryptData}, {@link encryptMessage}, {@link decryptData}, {@link decryptData}, {@link getRandomBytes}, etc.
 *
 * Interacting with this class maybe necessary in cases where the underlying crypto implementations need to be
 * customized, i.e. React Native
 *
 */
export class Crypto {

    /**
     * The adapter gives access to required crypto methods
     */
    static get adapter(): CryptoAdapter {
        const adapter = (globalThis as any)[GLOBAL_KEY] as CryptoAdapter;
        if(!adapter) {
            throw new CryptoError('No Crypto Adapter provided - Use [Crypto.init()] first');
        }
        return adapter;
    }

    /**
     * Initializes the crypto module with platform specific {@link CryptoAdapter}
     *
     * This must be called, before any of the crypto functions is being used
     *
     * @param cryptoAdapter The platform specific adapter, e.g. `NodeJSCryptoAdapter`, `WebCryptoAdapter`, or any other provider
     */
    static init(cryptoAdapter: CryptoAdapter) {
        (globalThis as any)[GLOBAL_KEY] = cryptoAdapter;
    }

}
