import {describe, expect, test} from 'vitest';
import {getRandomBytes, getRandomString, getRandomWords} from '../random';

describe('random', () => {
    describe('getRandomBytes', () => {

        test('should return the correct number of bytes', () => {
            const length = 16;
            const bytes = getRandomBytes(length);
            expect(bytes.length).toBe(length);
        });

        test.skip('distribution of bytes should be roughly uniform (this test may fail occasionally - rerun then)', () => {
            const Iterations = 500_000;
            const ByteRange = 256;
            const byteCount = new Array(ByteRange).fill(0);
            const length = 1; // Test one byte at a time to count occurrences of each byte value

            // Run the function many times and count occurrences of each byte value
            for (let i = 0; i < Iterations; i++) {
                const bytes = getRandomBytes(length);
                bytes.forEach(byte => {
                    byteCount[byte]++;
                });
            }
            const expectedCountPerByte = Iterations / ByteRange;
            // x % tolerance accepted, just to reduce failing quotas
            const tolerance = 0.2 * expectedCountPerByte;
            byteCount.forEach(count => {
                expect(count).toBeGreaterThanOrEqual(expectedCountPerByte - tolerance);
                expect(count).toBeLessThanOrEqual(expectedCountPerByte + tolerance);
            });

        });
    });

    describe('getRandomWords', () => {
        const dictionary = ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape'];

        test('should return the correct number of words', () => {
            const count = 3;
            const words = getRandomWords(count, dictionary);
            expect(words.length).toBe(count);
        });

        test('should throw an error if count is greater than dictionary length', () => {
            const count = dictionary.length + 1;
            expect(() => getRandomWords(count, dictionary)).toThrow('Too few words in dictionary');
        });

        test('should return unique words', () => {
            const count = 5;
            const words = getRandomWords(count, dictionary);
            const uniqueWords = new Set(words);
            expect(uniqueWords.size).toBe(count);
        });

        test('should return words that are in the dictionary', () => {
            const count = 4;
            const words = getRandomWords(count, dictionary);
            words.forEach(word => {
                expect(dictionary).toContain(word);
            });
        });
    });

    describe('getRandomString', () => {
        test('should return the correct number of characters', () => {
            const lengths = [1, 5, 10, 15, 32];
            lengths.forEach(length => {
                const randomString = getRandomString(length);
                expect(randomString.length).toBe(length);
            });
        });

        test('should return random string from custom alphabet', () => {
            const length = 32;
            const alphabet = '1234567890';
            const randomString = getRandomString(length, alphabet);
            randomString.split('').forEach(c => {
                expect(alphabet.indexOf(c)).toBeGreaterThan(-1);
            });
            expect(randomString.length).toBe(length);
        });

        test('should throw error if alphabet is empty', () => {
            const length = 32;
            const alphabet = '';
            expect(() => {
                getRandomString(length, alphabet);
            }).toThrow('Alphabet must not be empty.');
        });

        test('should throw error if alphabet is too large', () => {
            const length = 32;
            const alphabet = new Array<string>(2 ** 16 + 10).fill('a').join('');
            expect(() => {
                getRandomString(length, alphabet);
            }).toThrow('Alphabet is too large');
        });
    });
});
