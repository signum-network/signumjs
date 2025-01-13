/**
 *
 * The CryptoAdapter interface used by {@link Crypto} class
 *
 * Out of the box, @signumjs/crypto provides web and nodejs using this interface
 *
 * One might need to implement this interface for other environments, i.e. React Native and use {@link Crypto.init}
 *
 */
export interface CryptoAdapter {
    encryptAes256Cbc(plaintext: Uint8Array, key: Uint8Array): Promise<Uint8Array>;
    decryptAes256Cbc(ciphertext: Uint8Array, key: Uint8Array): Promise<Uint8Array>;
    sha256(data: ArrayBuffer): Uint8Array;
    getRandomValues(array: Uint8Array): Uint8Array;
}

