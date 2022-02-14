import {calculateMinimumCreationFee} from '../calculateMinimumCreationFee';

describe('calculateMinimumCreationFee', () => {
    it('calculates minimum contract fee in planck - code only', () => {

        expect(calculateMinimumCreationFee({
            hexCode: 'xx'.repeat(513)
        }).getSigna()).toBe('0.3675');

        expect(calculateMinimumCreationFee({
            hexCode: 'xx'.repeat(300)
        }).getSigna()).toBe('0.294');

        expect(calculateMinimumCreationFee({
            hexCode: 'xx'.repeat(1)
        }).getSigna()).toBe('0.2205');
    });

    it('calculates minimum contract fee in planck - data only', () => {
        expect(calculateMinimumCreationFee({
            hexData: 'xx'.repeat(513)
        }).getSigna()).toBe('0.3675');

        expect(calculateMinimumCreationFee({
            hexData: 'xx'.repeat(300)
        }).getSigna()).toBe('0.294');

        expect(calculateMinimumCreationFee({
            hexData: 'xx'.repeat(1)
        }).getSigna()).toBe('0.2205');
    });

    it('calculates minimum contract fee in planck - data and code', () => {
        expect(calculateMinimumCreationFee({
            hexCode: 'xx'.repeat(513),
            hexData: 'xx'.repeat(513)
        }).getSigna()).toBe('0.588');

        expect(calculateMinimumCreationFee({
            hexCode: 'xx'.repeat(300),
            hexData: 'xx'.repeat(300)
        }).getSigna()).toBe('0.441');

        expect(calculateMinimumCreationFee({
            hexCode: 'xx'.repeat(1),
            hexData: 'xx'.repeat(1)
        }).getSigna()).toBe('0.294');
    });

});
