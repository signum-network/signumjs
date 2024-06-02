/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 * Modified work Copyright (c) 2024 Signum Network
 */

import {inflate} from 'pako';
import {ECKCDSA} from './ec-kcdsa';
import {EncryptedData} from './typings/encryptedData';
import {getCryptoKey, CryptoParams, crypto} from './crypto';
import {EncryptedMessage} from './typings/encryptedMessage';
import {CryptoError} from './typings/cryptoError';

/**
 *
 * @ignore
 * @internal
 * @module crypto
 *
 */
async function decrypt(ivCiphertext: Uint8Array, nonce: Uint8Array, sharedKeyOrig: any[]) {
    if (ivCiphertext.length < CryptoParams.IvLength || ivCiphertext.length % CryptoParams.IvLength !== 0) {
        throw new CryptoError('Invalid Ciphertext');
    }
    const sharedKey = new Uint8Array(sharedKeyOrig.slice(0));
    for (let i = 0; i < CryptoParams.SharedKeyLength; i++) {
        sharedKey[i] ^= nonce[i];
    }
    try {
        const keyBuffer = await crypto.subtle.digest('SHA-256', sharedKey);
        const key = await getCryptoKey(keyBuffer);
        const iv = ivCiphertext.slice(0, CryptoParams.IvLength);
        const ciphertext = ivCiphertext.slice(CryptoParams.IvLength);
        const decryptedBuffer = await crypto.subtle.decrypt(
            {
                name: 'AES-CBC',
                iv
            },
            key,
            ciphertext
        );

        return new Uint8Array(decryptedBuffer);
    } catch (e) {
        // @ts-ignore
        throw new CryptoError(e.message);
    }
}

/**
 * Decrypts an encrypted cipher text
 * @param encryptedData The encrypted data
 * @param senderPublicKeyHex The senders public key in hex format
 * @param recipientPrivateKeyHex The recipients private (agreement) key in hex format
 * @return The original plain text
 * @module crypto
 */
export async function decryptData(
    encryptedData: EncryptedData,
    senderPublicKeyHex: string,
    recipientPrivateKeyHex: string): Promise<Uint8Array> {
    try {
        const sharedKey =
            ECKCDSA.sharedkey(
                Buffer.from(recipientPrivateKeyHex, 'hex'),
                Buffer.from(senderPublicKeyHex, 'hex'),
            );

        const compressedPlaintext = await decrypt(encryptedData.data, encryptedData.nonce, sharedKey);
        return inflate(compressedPlaintext);
    } catch (e) {
        // @ts-ignore
        throw new CryptoError(e.message);
    }
}


/**
 * Decrypts an encrypted Message
 * @param encryptedMessage The encrypted message
 * @param senderPublicKeyHex The senders public key in hex format
 * @param recipientPrivateKeyHex The recipients private (agreement) key in hex format
 * @return The original message
 * @module crypto
 */
export async function decryptMessage(
    encryptedMessage: EncryptedMessage,
    senderPublicKeyHex: string,
    recipientPrivateKeyHex: string): Promise<string> {

    if (!encryptedMessage.isText) {
        throw new CryptoError('Encrypted message is marked as non-text. Use decryptData instead');
    }

    const encryptedData = {
        data: new Uint8Array(Buffer.from(encryptedMessage.data, 'hex')),
        nonce: new Uint8Array(Buffer.from(encryptedMessage.nonce, 'hex'))
    };

    const decryptedBytes = await decryptData(encryptedData, senderPublicKeyHex, recipientPrivateKeyHex);
    return Buffer.from(decryptedBytes).toString('utf-8');
}
