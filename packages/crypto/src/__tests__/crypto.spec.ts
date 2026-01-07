import {describe, test, expect, beforeEach} from 'vitest';

import {CryptoAdapter} from '../typings/cryptoAdapter';
import {Crypto} from '../base';
import {sha256AsBytes} from '../sha256';

class TestCryptoAdapter implements CryptoAdapter {
    encryptAes256Cbc(plaintext: Uint8Array, key: Uint8Array): Promise<Uint8Array> {
        return Promise.resolve(new Uint8Array([1, 2, 3, 4, 5]));
    }
    decryptAes256Cbc(ciphertext: Uint8Array, key: Uint8Array): Promise<Uint8Array> {
        return Promise.resolve(new Uint8Array([10, 20, 30, 40, 50]));
    }
    sha256(data: ArrayBuffer): Uint8Array {
        return new Uint8Array([11, 12, 13, 14, 15]);
    }
    getRandomValues(array: Uint8Array): Uint8Array {
        return new Uint8Array([21, 22, 23, 24, 25]);
    }

}

describe('Crypto', () => {

    test('should use custom crypto provider', () => {
        Crypto.init(new TestCryptoAdapter());
        const testHash = Crypto.adapter.sha256(new Uint8Array([12, 23, 54, 46]));
        expect(testHash).toEqual(new Uint8Array([11, 12, 13, 14, 15]));
    });
    test('should use custom crypto provider', () => {
        Crypto.init(new TestCryptoAdapter());
        const testHash = sha256AsBytes('foo', 'utf8');
        expect(testHash).toEqual(new Uint8Array([11, 12, 13, 14, 15]));
    });
    test('should throw error when no crypto provider available', () => {
        Crypto.init(undefined);
        expect(() => Crypto.adapter.sha256(new Uint8Array([11, 12, 13, 14, 15]))).toThrow('No Crypto Adapter provided - Use [Crypto.init()] first');
    })
});
