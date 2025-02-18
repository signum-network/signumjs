/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 * Modified work Copyright (c) 2024 Signum Network
 */

import {ECKCDSA, Crypto, Buffer,CryptoParams} from './base';
import {EncryptedData} from './typings/encryptedData';
import {deflate} from 'pako/lib/deflate';
import {getRandomBytes} from './random';
import {EncryptedMessage} from './typings/encryptedMessage';
import {CryptoError} from './typings/cryptoError';

/**
 *
 * @ignore
 * @internal
 */
async function encrypt(plaintext: Uint8Array, nonce: Uint8Array, sharedKeyOrig: any[]) {
    try {
        const sharedKey = new Uint8Array(sharedKeyOrig.slice(0));
        for (let i = 0; i < CryptoParams.SharedKeyLength; i++) {
            sharedKey[i] ^= nonce[i];
        }
        const adapter = Crypto.adapter;
        const key = adapter.sha256(sharedKey);
        return await adapter.encryptAes256Cbc(plaintext, key);
    } catch (e) {
        // @ts-ignore
        throw new CryptoError(e.message);
    }
}

/**
 * Encrypts arbitrary data for P2P message/data exchange using asymmetric encryption
 *
 * @see {@link decryptData}
 * @param plaintext Data to be encrypted
 * @param recipientPublicKeyHex The recipients public key in hexadecimal format
 * @param senderPrivateKeyHex The senders private (agreement) key hexadecimal format
 * @return The encrypted Data
 *
 * @category en/decryption
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

        const compressedData = deflate(plaintext);
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
 * @see {@link decryptMessage}
 * @param plaintext Message to be encrypted
 * @param recipientPublicKeyHex The recipients public key hexadecimal format
 * @param senderPrivateKeyHex The senders private (agreement) key hexadecimal format
 * @return The encrypted Message
 *
 * @category en/decryption
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
