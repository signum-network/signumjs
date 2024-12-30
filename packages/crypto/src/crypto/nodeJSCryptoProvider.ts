import {CryptoProvider} from '../typings/cryptoProvider';
import {CryptoParams} from './cryptoParams';
import {CryptoError} from '../typings/cryptoError';

export class NodeJSCryptoProvider implements CryptoProvider {
    private readonly crypto: any;

    constructor() {
        this.crypto = require('crypto');
    }

    getRandomValues(array: Uint8Array): Uint8Array {
        return this.crypto.randomFillSync(array);
    }


    async decryptAes256Cbc(ciphertext: Uint8Array, key: Uint8Array) {
        return new Promise<Uint8Array>((resolve, reject) => {
            try {
                const iv = ciphertext.slice(0, CryptoParams.IvLength); // Assuming IvLength is 16
                const encryptedText = ciphertext.slice(CryptoParams.IvLength);
                const decipher = this.crypto.createDecipheriv('aes-256-cbc', key, iv);

                let decrypted = decipher.update(encryptedText);
                decrypted = Buffer.concat([decrypted, decipher.final()]);

                resolve(new Uint8Array(decrypted));
            } catch (e) {
                // @ts-ignore
                reject(new CryptoError(e.message));
            }
        });
    }

    async encryptAes256Cbc(plaintext: Uint8Array, key: Uint8Array) {
        return new Promise<Uint8Array>((resolve, reject) => {
            try {
                const iv = this.getRandomValues(new Uint8Array(CryptoParams.IvLength));
                const cipher = this.crypto.createCipheriv('aes-256-cbc', key, iv);

                let encrypted = cipher.update(plaintext);
                encrypted = Buffer.concat([encrypted, cipher.final()]);

                const ivAndCiphertext = new Uint8Array(iv.length + encrypted.length);
                ivAndCiphertext.set(iv);
                ivAndCiphertext.set(new Uint8Array(encrypted), iv.length);
                resolve(ivAndCiphertext);
            } catch (e) {
                // @ts-ignore
                reject(new CryptoError(e.message));
            }
        });
    }

    sha256(data: ArrayBuffer): Uint8Array {
        const hash = this.crypto.createHash('SHA256').update(Buffer.from(data)).digest();
        return new Uint8Array(hash);
    }
}
