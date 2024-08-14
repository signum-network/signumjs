import {CryptoProvider} from '../typings/cryptoProvider';
import {CryptoParams} from './cryptoParams';

export class WebCryptoProvider implements CryptoProvider {
    private crypto: Crypto;

    constructor() {
        if (typeof window !== 'undefined') {
            this.crypto = window.crypto;
        } else {
            throw new Error('WebCryptoProvider: Looks like you are not in a web environment...');
        }
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

    async decryptAes256Cbc(ciphertext: Uint8Array, key: Uint8Array): Promise<Uint8Array> {
        const cryptoKey = await this.getKey(key);
        const iv = ciphertext.slice(0, CryptoParams.IvLength);
        const decryptedBuffer = await this.crypto.subtle.decrypt(
            {
                name: 'AES-CBC',
                iv
            },
            cryptoKey,
            ciphertext.slice(CryptoParams.IvLength)
        );

        return new Uint8Array(decryptedBuffer);
    }

    async encryptAes256Cbc(plaintext: Uint8Array, key: Uint8Array): Promise<Uint8Array> {
        const cryptoKey = await this.getKey(key);
        const iv = this.getRandomValues(new Uint8Array(CryptoParams.IvLength));

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
