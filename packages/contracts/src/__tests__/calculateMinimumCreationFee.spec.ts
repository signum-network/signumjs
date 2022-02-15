import {calculateMinimumCreationFee} from '../calculateMinimumCreationFee';

describe('calculateMinimumCreationFee', () => {
    it('calculates minimum contract fee in planck - code only', () => {

        expect(calculateMinimumCreationFee({
            codeHex: 'xx'.repeat(513)
        }).getSigna()).toBe('0.3675');

        expect(calculateMinimumCreationFee({
            codeHex: 'xx'.repeat(300)
        }).getSigna()).toBe('0.294');

        expect(calculateMinimumCreationFee({
            codeHex: 'xx'.repeat(1)
        }).getSigna()).toBe('0.2205');
    });

    it('calculates minimum contract fee in planck - data only', () => {
        expect(calculateMinimumCreationFee({
            dataHex: 'xx'.repeat(513)
        }).getSigna()).toBe('0.3675');

        expect(calculateMinimumCreationFee({
            dataHex: 'xx'.repeat(300)
        }).getSigna()).toBe('0.294');

        expect(calculateMinimumCreationFee({
            dataHex: 'xx'.repeat(1)
        }).getSigna()).toBe('0.2205');
    });

    it('calculates minimum contract fee in planck - data and code', () => {
        expect(calculateMinimumCreationFee({
            codeHex: 'xx'.repeat(513),
            dataHex: 'xx'.repeat(513)
        }).getSigna()).toBe('0.588');

        expect(calculateMinimumCreationFee({
            codeHex: 'xx'.repeat(300),
            dataHex: 'xx'.repeat(300)
        }).getSigna()).toBe('0.441');

        expect(calculateMinimumCreationFee({
            codeHex: 'xx'.repeat(1),
            dataHex: 'xx'.repeat(1)
        }).getSigna()).toBe('0.294');
    });

});
