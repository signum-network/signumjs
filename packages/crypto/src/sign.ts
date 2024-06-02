/**
 * Original work Copyright (c) 2024 Signum Network
 */

import {ECKCDSA} from './ec-kcdsa';
import {Buffer} from './crypto';
import {sha256AsBytes, sha256Binary} from './sha256';
import {SignKeys} from './typings/signKeys';

function toBytes(hex: string): Uint8Array {
    return new Uint8Array(Buffer.from(hex, 'hex'));
}

function mergeArrays(a: Uint8Array, b: Uint8Array): Uint8Array {
    const merged = new Uint8Array(a.length + b.length);
    merged.set(a);
    merged.set(b, a.length);
    return merged;
}

/**
 * Generate the Signum Sign Keys from an initial Passphrase.
 * @param passPhrase The passphrase
 * @return EC-KCDSA sign key pair + agreement key
 * @module crypto
 */
export async function generateSignKeys(passPhrase: string): Promise<SignKeys> {
    const hashedPassPhrase = await sha256AsBytes(passPhrase);
    const keys = ECKCDSA.keygen(hashedPassPhrase);
    return {
        publicKey: Buffer.from(keys.p).toString('hex'),
        signPrivateKey: Buffer.from(keys.s).toString('hex'),
        agreementPrivateKey: Buffer.from(keys.k).toString('hex')
    };
}

/**
 * Generate a signature for a transaction
 *
 * Method:
 * ```
 *  s = sign(sha256(sha256(transactionHex)_keygen(sha256(sha256(transactionHex)_privateKey)).publicKey),
 *          sha256(sha256(transactionHex)_privateKey),
 *          privateKey)
 *  p = sha256(sha256(transactionHex)_keygen(sha256(transactionHex_privateKey)).publicKey)
 * ```
 * @see [[verifySignature]]
 * @param messageHex The data in hexadecimal representation
 * @param privateKeyHex The private key for signing in hexadecimal representation
 * @return The signature in hexadecimal format
 * @module crypto
 */
export async function generateSignature(messageHex: string, privateKeyHex: string): Promise<string> {
    const m = await sha256Binary(messageHex);
    const s = toBytes(privateKeyHex);
    const m_s = mergeArrays(m, s);
    const x = await sha256Binary(m_s);
    const y = Buffer.from(ECKCDSA.keygen(x).p);
    const m_y = mergeArrays(m, y);
    const h = await sha256Binary(m_y);
    const v = Buffer.from(ECKCDSA.sign(h, x, s));
    return Buffer.from(mergeArrays(v, h)).toString('hex');
}



/**
 * Verify a signature for given message
 *
 *  * Method:
 * ```
 * * h1 = sha256(sha256(transactionHex)_keygen(sha256(transactionHex_privateKey)).publicKey)
 * ==
 * sha256(sha256(transactionHex)_verify(v, h1, publickey)) = h2
 * ```
 * @see [[generateSignature]]
 * @param signature The signature to be verified
 * @param messageHex The message data in hexadecimal representation
 * @param publicKeyHex The public key
 * @return _true_, if signature is valid, otherwise _false_
 * @module crypto
 */
export async function verifySignature(signature: string, messageHex: string, publicKeyHex: string): Promise<boolean> {
    const signatureBytes = toBytes(signature);
    const publicKeyBytes = toBytes(publicKeyHex);
    const v = signatureBytes.slice(0, 32);
    const h1 = signatureBytes.slice(32);
    const y = Buffer.from(ECKCDSA.verify(v, h1, publicKeyBytes));

    const m = await sha256Binary(messageHex);
    const m_y = mergeArrays(m, y);
    const h2 = await sha256Binary(m_y);

    // fast comparison
    if (h1.length !== h2.length) { return false; }
    for (let i = 0; i < h1.length; i++) {
        if (h1[i] !== h2[i]) { return false; }
    }
    return true;
}


/**
 * Generates a signed message digest, which can be sent to Signum Node API then
 *
 * @see [[generateSignature]]
 * @param unsignedTransactionHex The unsigned message
 * @param signature The signature
 * @return The signed message digest
 * @module crypto
 */
export const generateSignedTransactionBytes = (unsignedTransactionHex: string, signature: string): string =>
    unsignedTransactionHex.substr(0, 192) + signature + unsignedTransactionHex.substr(320);

