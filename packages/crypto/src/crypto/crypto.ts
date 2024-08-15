import {CryptoProvider} from '../typings/cryptoProvider';
import {NodeJSCryptoProvider} from './nodeJSCryptoProvider';
import {WebCryptoProvider} from './webCryptoProvider';

/**
 *
 * Unified isomorphic Crypto Class for common crypto operations needed for Signum.
 *
 * Usually, you want to use the comfort functions like
 * [[encryptData]], [[encryptMessage]], [[decryptData]], [[decryptData]], [[getRandomValues]], etc.
 *
 * Interacting with this class maybe necessary in cases where the underlying crypto implementations need to be
 * customized, i.e. React Native
 **
 * @module crypto
 */
export class Crypto {

    private static instance: Crypto;
    private cryptoProvider: CryptoProvider;

    private constructor() {
        this.cryptoProvider = Crypto.isNode() ? new NodeJSCryptoProvider() : new WebCryptoProvider();
    }

    /**
     * The provider gives access to required crypto methods
     */
    get provider(): CryptoProvider {
        return this.cryptoProvider;
    }


    /**
     * Singleton instance accessor
     */
    static getInstance(): Crypto {
        if (!Crypto.instance) {
            Crypto.instance = new Crypto();
        }
        return Crypto.instance;
    }

    /**
     * @return true, if environment is nodejs (or similar)
     */
    // public static isNode() {
    //     return typeof global.process !== 'undefined' && global.process.versions != null && global.process.versions.node != null;
    // }

    public static isNode() {
        return typeof process !== 'undefined' && process.versions != null && process.versions.node != null;
    }

    /**
     * Allows to set a custom crypto provider.
     * This may be useful/necessary when using non-NodeJs or non-Web environments, e.g. React Native
     * @param customProvider The implementation of a CryptoProvider
     */
    setCustomProvider(customProvider: CryptoProvider): void {
        this.cryptoProvider = customProvider;
    }
}

