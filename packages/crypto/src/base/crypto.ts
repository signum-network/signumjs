import {CryptoAdapter} from '../typings/cryptoAdapter';
import {CryptoError} from '../typings/cryptoError';

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

    private static cryptoAdapter: CryptoAdapter;

    /**
     * The adapter gives access to required crypto methods
     */
    static get adapter(): CryptoAdapter {
        if(!Crypto.cryptoAdapter) {
            throw new CryptoError('No Crypto Adapter provided - Use [Crypto.init()] first');
        }
        return Crypto.cryptoAdapter;
    }

    /**
     * Initializes the crypto module with platform specific {@link CryptoAdapter}
     *
     * This must be called, before any of the crypto functions is being used
     *
     * @param cryptoAdapter The platform specific adapter, e.g. {@link NodeJSCryptoAdapter}, {@link WebCryptoAdapter}, or any other provider
     */
    static init(cryptoAdapter: CryptoAdapter) {
        Crypto.cryptoAdapter = cryptoAdapter;
    }

}
