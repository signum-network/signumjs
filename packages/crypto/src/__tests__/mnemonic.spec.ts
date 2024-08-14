import { describe, expect, test } from 'vitest';
import {generateMnemonic, Strength} from '../mnemonic';
import {words} from '../dictionaries/en';

describe('generateMnemonic', () => {
    test('should generate mnemonic with default parameters', () => {
        const result = generateMnemonic();
        const wordArray = new Set(result.split(' '));
        expect(wordArray.size).toBe(Strength.Bits_192);
        wordArray.forEach((word) => {
                expect(words.includes(word)).toBeTruthy();
            }
        );
    });

    test('should generate mnemonic with custom strength', () => {
        const result = generateMnemonic(words, Strength.Bits_224);
        const wordArray = new Set(result.split(' '));
        expect(wordArray.size).toBe(Strength.Bits_224.valueOf());
        wordArray.forEach((word) => {
                expect(words.includes(word)).toBeTruthy();
            }
        );
    });

    test('should generate mnemonic with custom dictionary', () => {
        let i = 0;
        const customDictionary: string[] = [];
        while (customDictionary.length < 1024) {
            customDictionary.push(`word-${++i}`);
        }
        const result = generateMnemonic(customDictionary, Strength.Bits_128);
        const wordArray = new Set(result.split(' '));
        wordArray.forEach((word) => {
                expect(customDictionary.includes(word)).toBeTruthy();
            }
        );
    });

    test('should throw error is dictionary is too small', () => {
        const customDictionary = ['this', 'is', 'too', 'small'];
        expect(() => {
            generateMnemonic(customDictionary);
        }).toThrow('Dictionary too weak');
    });

    test('should return correct number of words for each strength', () => {
        for (const strength of Object.values(Strength)) {
            if (typeof strength === 'number') {
                const result = generateMnemonic(words, strength);
                const wordArray = new Set(result.split(' '));
                expect(wordArray.size).toBe(strength);
            }
        }
    });
});
