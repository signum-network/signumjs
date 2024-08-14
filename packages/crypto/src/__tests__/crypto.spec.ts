import {describe, test, expect} from 'vitest';

import {CryptoProvider} from '../typings/cryptoProvider';
import {Crypto} from '../crypto';
import {sha256AsBytes} from '../sha256';

class TestCryptoProvider implements CryptoProvider {
    encryptAes256Cbc(plaintext: Uint8Array, key: Uint8Array): Promise<Uint8Array> {
        return Promise.resolve(new Uint8Array([1, 2, 3, 4, 5]));
    }
    decryptAes256Cbc(ciphertext: Uint8Array, key: Uint8Array): Promise<Uint8Array> {
        return Promise.resolve(new Uint8Array([10, 20, 30, 40, 50]));
    }
    sha256(data: ArrayBuffer): Promise<Uint8Array> {
        return Promise.resolve(new Uint8Array([11, 12, 13, 14, 15]));
    }
    getRandomValues(array: Uint8Array): Uint8Array {
        return new Uint8Array([21, 22, 23, 24, 25]);
    }

}

describe('Crypto', () => {
    test('should use custom crypto provider', async () => {
        const crypto = Crypto.getInstance();
        crypto.setCustomProvider(new TestCryptoProvider());
        const testHash = await crypto.provider.sha256(new Uint8Array([12, 23, 54, 46]));
        expect(testHash).toEqual(new Uint8Array([11, 12, 13, 14, 15]));
    });
    test('should use custom crypto provider', async () => {
        Crypto.getInstance().setCustomProvider(new TestCryptoProvider());
        const testHash = await sha256AsBytes('foo', 'utf8');
        expect(testHash).toEqual(new Uint8Array([11, 12, 13, 14, 15]));
    });
});
