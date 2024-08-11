/**
 * MIT License
 *
 * Copyright (c) 2020 Peculiar Ventures, LLC
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import {CryptoProvider} from './cryptoProvider';
import {NodeJSCryptoProvider} from './nodeJSCryptoProvider';
import {WebCryptoProvider} from './webCryptoProvider';

/**
 *
 * Unified isomorphic Crypto Class for common crypto operations needed for Signum.
 *
 * Usually, you want to use the comfort functions like
 * [[encryptData]], [[encryptMessage]], [[decryptData]], [[decryptData]], [[getRandomValues]], etc.
 *
 * Interacting with this class maybe necessary in cases where the underliying crypto implementations need to be
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
