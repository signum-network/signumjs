/**
 * Original work Copyright (c) 2024 Signum Network
 */

import {crypto} from './crypto';

/**
 * The type for a random values provider, if needed.
 * @see [[getRandomBytes]]
 *
 * @module crypto
 */
export type RandomValuesProvider = <T extends ArrayBufferView>(buffer: T) => T;

const DefaultRandomProvider = crypto.getRandomValues as RandomValuesProvider;

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
 * @param randomValuesProvider The random values generator can be overwritten.
 * This might be relevant on React Native or other environments, where a custom random value provider is required
 *
 * @return An array of bytes of given length
 * @module crypto
 */
export function getRandomBytes(length: number, randomValuesProvider = DefaultRandomProvider): Uint8Array {
    return randomValuesProvider(new Uint8Array(length));
}

/**
 * Gets an array of random words from a dictionary
 *
 * @param count The number of words generated
 * @param dictionary An array of strings from where the random words are picked
 * @param randomValuesProvider The random values generator can be overwritten.
 * This might be relevant on React Native or other environments, where a custom random value provider is required
 *
 * @return An array with _count_ words
 * @throws An error if dictionary's length is smaller than _count_
 * @module crypto
 */
export function getRandomWords(count: number, dictionary: string[], randomValuesProvider = DefaultRandomProvider): string[] {
    if (count > dictionary.length) {
        throw new Error('Too few words in dictionary');
    }
    const indices = new Set<number>();
    const uint16 = new Uint8Array(1);
    while (indices.size < count) {
        const randomIndex = randomValuesProvider(uint16)[0] % dictionary.length;
        indices.add(randomIndex);
    }
    return Array.from(indices).map(index => dictionary[index]);
}

/**
 * Default Alphabet
 * @see [[getRandomString]]
 * @module crypto
 */
export const DefaultAlphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' as string;

/**
 * Gets a string of random characters from a give alphabet
 *
 * @param length The length of the resulting string
 * @param alphabet An string with characters used for random picks. Default Alphabet is alphanumeric without special chars
 * @param randomValuesProvider The random values generator can be overwritten.
 * This might be relevant on React Native or other environments, where a custom random value provider is required
 *
 * @return A string with random characters of given length
 * @throws An error if alphabet is empty or too large (2^16 chars is limit)
 * @module crypto
 */
export function getRandomString(length: number, alphabet: string = DefaultAlphabet, randomValuesProvider = DefaultRandomProvider): string {
    if (alphabet.length === 0) {
        throw new Error('Alphabet must not be empty.');
    }
    if (alphabet.length >= 2 ** 16) { // just supporting UInt16
        throw new Error('Alphabet is too large.');
    }
    const indices = randomValuesProvider(new Uint16Array(length));
    return indices.reduce((str, i) => str + alphabet[i % alphabet.length], '');
}
