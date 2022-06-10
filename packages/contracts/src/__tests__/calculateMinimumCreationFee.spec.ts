import {calculateMinimumCreationFee} from '../calculateMinimumCreationFee';

describe('calculateMinimumCreationFee', () => {
    it('calculates minimum contract fee in planck - code only', () => {

        expect(calculateMinimumCreationFee({
            codeHex: 'xx'.repeat(513)
        }).getSigna()).toBe('0.6');

        expect(calculateMinimumCreationFee({
            codeHex: 'xx'.repeat(300)
        }).getSigna()).toBe('0.5');

        expect(calculateMinimumCreationFee({
            codeHex: 'xx'.repeat(1)
        }).getSigna()).toBe('0.4');
    });

    it('calculates minimum contract fee in planck - data only', () => {
        expect(calculateMinimumCreationFee({
            dataHex: 'xx'.repeat(513)
        }).getSigna()).toBe('0.5');

        expect(calculateMinimumCreationFee({
            dataHex: 'xx'.repeat(300)
        }).getSigna()).toBe('0.4');

        expect(calculateMinimumCreationFee({
            dataHex: 'xx'.repeat(1)
        }).getSigna()).toBe('0.3');
    });

    it('calculates minimum contract fee in planck - data and code', () => {
        expect(calculateMinimumCreationFee({
            codeHex: 'xx'.repeat(513),
            dataHex: 'xx'.repeat(513)
        }).getSigna()).toBe('0.8');

        expect(calculateMinimumCreationFee({
            codeHex: 'xx'.repeat(300),
            dataHex: 'xx'.repeat(300)
        }).getSigna()).toBe('0.6');

        expect(calculateMinimumCreationFee({
            codeHex: 'xx'.repeat(1),
            dataHex: 'xx'.repeat(1)
        }).getSigna()).toBe('0.4');
    });

});
