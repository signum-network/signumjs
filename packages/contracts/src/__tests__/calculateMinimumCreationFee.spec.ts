import {calculateMinimumCreationFee} from '../calculateMinimumCreationFee';

describe('calculateMinimumCreationFee', () => {
    it('calculates minimum contract fee in planck', () => {
        expect(calculateMinimumCreationFee('xx'.repeat(513)).getSigna()).toBe('0.441');
        expect(calculateMinimumCreationFee('xx'.repeat(300)).getSigna()).toBe('0.3675');
        expect(calculateMinimumCreationFee('xx'.repeat(1)).getSigna()).toBe('0.294');
    });
});
