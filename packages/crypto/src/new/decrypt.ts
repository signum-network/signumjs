/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 * Modified work Copyright (c) 2024 Signum Network
 */

import {inflate} from 'pako';
import {ECKCDSA} from '../ec-kcdsa';
import {EncryptedData} from '../typings/encryptedData';
import {getCryptoKey, CryptoParams} from './crypto';

async function decrypt(ivCiphertext: Uint8Array, nonce: Uint8Array, sharedKeyOrig: any[]) {
    if (ivCiphertext.length < CryptoParams.IvLength || ivCiphertext.length % CryptoParams.IvLength !== 0) {
        throw new Error('Invalid Ciphertext');
    }
    const sharedKey = new Uint8Array(sharedKeyOrig.slice(0));
    for (let i = 0; i < CryptoParams.SharedKeyLength; i++) {
        sharedKey[i] ^= nonce[i];
    }
    const keyBuffer = await crypto.subtle.digest('SHA-256', sharedKey);
    const key = await getCryptoKey(keyBuffer);
    const iv = ivCiphertext.slice(0, CryptoParams.IvLength);
    const ciphertext = ivCiphertext.slice(CryptoParams.IvLength);

    const decryptedBuffer = await crypto.subtle.decrypt(
        {
            name: 'AES-CBC',
            iv: iv
        },
        key,
        ciphertext
    );

    return new Uint8Array(decryptedBuffer);
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

    const sharedKey =
        ECKCDSA.sharedkey(
            Buffer.from(recipientPrivateKeyHex, 'hex'),
            Buffer.from(senderPublicKeyHex, 'hex'),
        );

    const compressedPlaintext = await decrypt(encryptedData.data, encryptedData.nonce, sharedKey);
    return inflate(compressedPlaintext);
}
