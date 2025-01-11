import {CryptoProvider} from '../typings/cryptoProvider';
import {NodeJSCryptoProvider} from './nodeJSCryptoProvider';
import {WebCryptoProvider} from './webCryptoProvider';

/**
 *
 * Unified isomorphic Crypto Class for common crypto operations needed for Signum.
 *
 * Usually, you want to use the comfort functions like
 * {@link encryptData}, {@link encryptMessage}, {@link decryptData}, {@link decryptData}, {@link getRandomBytes}, etc.
 *
 * Interacting with this class maybe necessary in cases where the underlying crypto implementations need to be
 * customized, i.e. React Native
 *
 */
export class Crypto {

    private static instance: Crypto;

    private constructor(private cryptoProvider: CryptoProvider) {
    }

    /**
     * The provider gives access to required crypto methods
     */
    get provider(): CryptoProvider {
        return this.cryptoProvider;
    }


    /**
     * Singleton instance accessor
     * @param customProvider The implementation of a CryptoProvider for non-Web or NodeJS environments
     */
    static getInstance(customProvider?: CryptoProvider): Crypto {
        if (!Crypto.instance) {
            const provider = !customProvider ? Crypto.isNode() ? new NodeJSCryptoProvider() : new WebCryptoProvider() : customProvider;
            Crypto.instance = new Crypto(provider);
        }
        return Crypto.instance;
    }

    /**
     * @return true, if environment is nodejs (or similar)
     */
    public static isNode() {
        return typeof process !== 'undefined' && process.versions != null && process.versions.node != null;
    }

}

