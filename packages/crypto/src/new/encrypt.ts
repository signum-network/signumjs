/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 * Modified work Copyright (c) 2024 Signum Network
 */

import {ECKCDSA} from '../ec-kcdsa';
import {EncryptedData} from '../typings/encryptedData';
import {gzip} from 'pako';
import {randomBytes} from './random';
import {getCryptoKey, crypto, CryptoParams} from './crypto';

async function __encrypt(plaintext: Uint8Array, nonce: Uint8Array, sharedKeyOrig: any[]) {

    const sharedKey = new Uint8Array(sharedKeyOrig.slice(0));
    for (let i = 0; i < CryptoParams.SharedKeyLength; i++) {
        sharedKey[i] ^= nonce[i];
    }
    const keyBuffer = await crypto.subtle.digest('SHA-256', sharedKey);
    const key = await getCryptoKey(keyBuffer);
    const iv = randomBytes(CryptoParams.IvLength);
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

    const sharedKey =
        ECKCDSA.sharedkey(
            new Uint8Array(Buffer.from(senderPrivateKeyHex, 'hex')),
            new Uint8Array(Buffer.from(recipientPublicKeyHex, 'hex')),
        );

    const compressedData = gzip(plaintext);
    const nonce = randomBytes(CryptoParams.SharedKeyLength);
    const data = await __encrypt(compressedData, nonce, sharedKey);
    return {
        nonce,
        data
    };
}
