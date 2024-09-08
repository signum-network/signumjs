/**
 * Original work Copyright (c) 2024 Signum Network
 */

 import {words} from './dictionaries/en';
import {getRandomWords} from './random';

/**
 * The Strength of the generated mnemonic
 * Ranging from 128 bit (12 Words) to 256 bit (24 Words)
 *
 * @see {@link generateMnemonic}
 *
 * @category signing
 */
export enum Strength {
    Bits_128 = 12,
    Bits_160 = 15,
    Bits_192 = 18,
    Bits_224 = 21,
    Bits_256 = 24,
}

/**
 * Generates a passphrase aka mnemonic aka recovery phrase based on given dictionary, and strength
 * @param dictionary An array of words (at least 1024 words) to be used for generation. Default is the official BIP39 English Word List
 * @param strength {Strength} The strength of the resulting passphrase given in bits. Ranging from 128 bit (12 Words) to 256 bit (24 Words)
 *
 * @category signing
 */
export function generateMnemonic(dictionary: string[] = words, strength: Strength = Strength.Bits_192) {
    if (dictionary.length < 1024) {
        throw new Error('Dictionary too weak');
    }
    const randomWords = getRandomWords(strength.valueOf(), dictionary);
    return randomWords.join(' ');
}
