/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 * Modified work Copyright (c) 2024 Signum Network
 */

import {ECKCDSA} from './ec-kcdsa';
import {EncryptedData} from './typings/encryptedData';
import {gzip} from 'pako';
import {getRandomBytes} from './random';
import {getCryptoKey, crypto, CryptoParams, Buffer} from './crypto';
import {EncryptedMessage} from './typings/encryptedMessage';
import {CryptoError} from './typings/cryptoError';

/**
 *
 * @ignore
 * @internal
 * @module crypto
 *
 */
async function encrypt(plaintext: Uint8Array, nonce: Uint8Array, sharedKeyOrig: any[]) {
    try {
        const sharedKey = new Uint8Array(sharedKeyOrig.slice(0));
        for (let i = 0; i < CryptoParams.SharedKeyLength; i++) {
            sharedKey[i] ^= nonce[i];
        }
        const keyBuffer = await crypto.subtle.digest('SHA-256', sharedKey);
        const key = await getCryptoKey(keyBuffer);
        const iv = getRandomBytes(CryptoParams.IvLength);

        const ciphertextBuffer = await crypto.subtle.encrypt(
            {
                name: 'AES-CBC',
                iv
            },
            key,
            plaintext
        );

        const ciphertext = new Uint8Array(ciphertextBuffer);
        const ivAndCiphertext = new Uint8Array(iv.length + ciphertext.length);
        ivAndCiphertext.set(iv);
        ivAndCiphertext.set(ciphertext, iv.length);

        return ivAndCiphertext;
    } catch (e) {
        // @ts-ignore
        throw new CryptoError(e.message);
    }
}

/**
 * Encrypts arbitrary data for P2P message/data exchange using asymmetric encryption
 *
 * @see [[decryptData]]
 * @param plaintext Data to be encrypted
 * @param recipientPublicKeyHex The recipients public key in hexadecimal format
 * @param senderPrivateKeyHex The senders private (agreement) key hexadecimal format
 * @return The encrypted Data
 * @module crypto
 */
export async function encryptData(
    plaintext: Uint8Array,
    recipientPublicKeyHex: string,
    senderPrivateKeyHex: string): Promise<EncryptedData> {

    try {

        const sharedKey =
            ECKCDSA.sharedkey(
                Buffer.from(senderPrivateKeyHex, 'hex'),
                Buffer.from(recipientPublicKeyHex, 'hex'),
            );

        const compressedData = gzip(plaintext);
        const nonce = getRandomBytes(CryptoParams.SharedKeyLength);
        const data = await encrypt(compressedData, nonce, sharedKey);
        return {
            nonce,
            data
        };
    } catch (e) {
        // @ts-ignore
        throw new CryptoError(e.message);
    }
}


/**
 * Encrypts arbitrary message (UTF-8 compatible) for P2P message/data exchange using asymmetric encryption
 * @see [[decryptMessage]]
 * @param plaintext Message to be encrypted
 * @param recipientPublicKeyHex The recipients public key hexadecimal format
 * @param senderPrivateKeyHex The senders private (agreement) key hexadecimal format
 * @return The encrypted Message
 * @module crypto
 */
export async function encryptMessage(plaintext: string, recipientPublicKeyHex: string, senderPrivateKeyHex: string)
    : Promise<EncryptedMessage> {

    const data = new Uint8Array(Buffer.from(plaintext, 'utf-8'));
    const encryptedData = await encryptData(data, recipientPublicKeyHex, senderPrivateKeyHex);

    return {
        data: Buffer.from(encryptedData.data).toString('hex'),
        nonce: Buffer.from(encryptedData.nonce).toString('hex'),
        isText: true,
    };
}
