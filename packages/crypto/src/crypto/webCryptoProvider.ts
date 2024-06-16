import {CryptoProvider} from './cryptoProvider';
import {CryptoParams} from './cryptoParams';
import {getRandomBytes} from '../random';

export class WebCryptoProvider implements CryptoProvider {
    private crypto: Crypto;

    constructor() {
        this.crypto = global.crypto;
    }

    getRandomValues(array: Uint8Array): Uint8Array {
        return this.crypto.getRandomValues(array);
    }

    private async getKey(rawkey: Uint8Array) {
        return this.crypto.subtle.importKey(
            'raw',
            rawkey,
            'AES-CBC',
            true,
            ['encrypt', 'decrypt']
        );
    }

    async decryptAesCbc(ciphertext: Uint8Array, key: Uint8Array): Promise<Uint8Array> {
        const cryptoKey = await this.getKey(key);
        const iv = ciphertext.slice(0, CryptoParams.IvLength);
        const decryptedBuffer = await this.crypto.subtle.decrypt(
            {
                name: 'AES-CBC',
                iv
            },
            cryptoKey,
            ciphertext
        );

        return new Uint8Array(decryptedBuffer);
    }

    async encryptAesCbc(plaintext: Uint8Array, key: Uint8Array): Promise<Uint8Array> {
        const cryptoKey = await this.getKey(key);
        const iv = getRandomBytes(CryptoParams.IvLength);

        const ciphertextBuffer = await this.crypto.subtle.encrypt(
            {
                name: 'AES-CBC',
                iv
            },
            cryptoKey,
            plaintext
        );

        const ciphertext = new Uint8Array(ciphertextBuffer);
        const ivAndCiphertext = new Uint8Array(iv.length + ciphertext.length);
        ivAndCiphertext.set(iv);
        ivAndCiphertext.set(ciphertext, iv.length);

        return ivAndCiphertext;
    }

    async sha256(data: ArrayBuffer): Promise<Uint8Array> {
        const hashBuffer = await this.crypto.subtle.digest('SHA-256', data);
        return new Uint8Array(hashBuffer);
    }
}
