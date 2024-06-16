/**
 * @internal
 * @ignore
 */
export interface CryptoProvider {
    encryptAesCbc(plaintext: Uint8Array, key: Uint8Array): Promise<Uint8Array>;
    decryptAesCbc(ciphertext: Uint8Array, key: Uint8Array): Promise<Uint8Array>;
    sha256(data: ArrayBuffer): Promise<Uint8Array>;
    getRandomValues(array: Uint8Array): Uint8Array;
}

