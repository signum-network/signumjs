/**
 * Original work Copyright (c) 2024 Signum Network
 */

import {Crypto, Buffer} from './base';

/**
 * Gets am Array of random bytes
 *
 * This random function used is based on what kind of entropy the User Agent (Browser, OS) returns.
 * Depending on its runtime environment, it may use https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues
 * or https://nodejs.org/api/webcrypto.html#cryptogetrandomvaluestypedarray
 *
 * This means for that for browsers a secure context, i.e. https is required to make it work!
 *
 * @param length Length of array
 *
 * @return An array of bytes of given length
 *
 *
 * @category random
 */
export function getRandomBytes(length: number): Uint8Array {
    return Crypto.adapter.getRandomValues(new Uint8Array(length));
}

/**
 * Gets an array of random words from a dictionary
 *
 * > Usually 2048 words are sufficient. This method does not support dictionaries with more than 65536 words
 *
 * @param count The number of words generated
 * @param dictionary An array of strings from where the random words are picked
 *
 * @return An array with _count_ words
 * @throws An error if dictionary's length is smaller than _count_
 *
 * @category random
 */
export function getRandomWords(count: number, dictionary: string[]): string[] {
    if (count > dictionary.length) {
        throw new Error('Too few words in dictionary');
    }
    if (dictionary.length > 2 ** 32) {
        throw new Error('Dictionary must have less than 65536 words');
    }

    const indices = new Set<number>();
    const mask = 2 ** 32 - (2 ** 32 % dictionary.length);
    const randomBytes = new Uint8Array(4);
    const cp = Crypto.adapter;
    while (indices.size < count) {
        cp.getRandomValues(randomBytes);
        const randomUint32 = ((randomBytes[0] << 24) | (randomBytes[1] << 16) | (randomBytes[2] << 8) | randomBytes[3]) >>> 0;
        const randomIndex = randomUint32 % dictionary.length;
        // avoid random bias
        if (randomUint32 < mask) {
            indices.add(randomUint32 % dictionary.length);
        }
    }
    return Array.from(indices).map(index => dictionary[index]);
}

/**
 * Default Alphabet
 * @see {@link getRandomString}
 *
 * @category random
 */
export const DefaultAlphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' as string;

/**
 * Gets a string of random characters from a given alphabet
 *
 * @param length The length of the resulting string
 * @param alphabet An string with characters used for random picks. Default Alphabet is alphanumeric without special chars
 *
 * @return A string with random characters of given length
 * @throws An error if alphabet is empty or too large (2^16 chars is limit)
 *
 * @category random
 */
export function getRandomString(length: number, alphabet: string = DefaultAlphabet): string {
    if (alphabet.length === 0) {
        throw new Error('Alphabet must not be empty.');
    }
    const MaxLength = 65536; // 2**16
    if (alphabet.length >= MaxLength) { // just supporting UInt16
        throw new Error(`Alphabet is too large. Alphabet must be less than ${MaxLength} characters long.`);
    }
    const maxNonBiasedValue = Math.floor(MaxLength / alphabet.length) * alphabet.length;

    const indices = Crypto.adapter.getRandomValues(new Uint8Array(length * 2));
    const uint16View = new Uint16Array(indices.buffer);
    let result = '';
    for (let i = 0; i < length; i++) {
        let value = uint16View[i];
        // Reject values that would create bias
        while (value >= maxNonBiasedValue) {
            const newBytes = Crypto.adapter.getRandomValues(new Uint8Array(2));
            value = new Uint16Array(newBytes.buffer)[0];
        }
        result += alphabet[value % alphabet.length];
    }
    return result;
}
