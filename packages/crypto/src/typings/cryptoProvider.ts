/**
 *
 * The CryptoProvider interface used by [[Crypto]] class
 *
 * Out of the box, @signumjs/crypto supports web and nodejs using this interface
 *
 * One might need to implement this interface for other environments, i.e. React Native and use [[Crypto.setCustomProvider]]
 *
 * @module crypto
 */
export interface CryptoProvider {
    encryptAes256Cbc(plaintext: Uint8Array, key: Uint8Array): Promise<Uint8Array>;
    decryptAes256Cbc(ciphertext: Uint8Array, key: Uint8Array): Promise<Uint8Array>;
    sha256(data: ArrayBuffer): Promise<Uint8Array>;
    getRandomValues(array: Uint8Array): Uint8Array;
}

