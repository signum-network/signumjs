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
 * @module crypto
 * @internal
 * @ignore
 */
export class Crypto {

    private readonly cryptoProvider: CryptoProvider;

    constructor() {
        this.cryptoProvider = Crypto.isNode() ? new NodeJSCryptoProvider() : new WebCryptoProvider();
    }

    get provider(): CryptoProvider {
        return this.cryptoProvider;
    }

    public static isNode() {
        return typeof global.process !== 'undefined' && global.process.versions != null && global.process.versions.node != null;
    }
}

export const crypto = new Crypto();
