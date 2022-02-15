import {generateDataStack} from '../generateDataStack';

describe('generateDataStack', () => {
    it('generates a data stack', () => {

        const args = [
            1234,
            5678,
            true,
            '1234',
            '5678',
            false,
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10
        ];

        const stack = generateDataStack(args);
        expect(stack.dataHex).toBe(
            'd204000000000000' +
            '2e16000000000000' +
            '0100000000000000' +
            'd204000000000000' +
            '2e16000000000000' +
            '0000000000000000' +
            '0100000000000000' +
            '0200000000000000' +
            '0300000000000000' +
            '0400000000000000' +
            '0500000000000000' +
            '0600000000000000' +
            '0700000000000000' +
            '0800000000000000' +
            '0900000000000000' +
            '0a00000000000000');
        expect(stack.dataPageCount).toBe(1);
    });
    it('generates an empty  data stack', () => {

        const args = [];

        const stack = generateDataStack(args);
        expect(stack.dataHex).toBe('');
        expect(stack.dataPageCount).toBe(1);
    });
});
