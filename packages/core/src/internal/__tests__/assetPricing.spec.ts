import {convertAssetPriceToPlanck, convertPlanckToAssetPrice} from '../convertAssetPricing';
import {Amount} from '@signumjs/util';

describe('assetPricing', () => {
    describe('convertAssetPriceToPlanck', () => {
        it('convert as expected', () => {
            expect(convertAssetPriceToPlanck('3300', 4)).toBe('33000000');
            expect(convertAssetPriceToPlanck('10000', 4)).toBe('100000000');
            expect(convertAssetPriceToPlanck('290000000', 2)).toBe('29000000000');
            expect(convertAssetPriceToPlanck('0', 2)).toBe('0');
        });
    });
    describe('convertPlanckToAssetPrice', () => {
        it('convert as expected', () => {
            expect(convertPlanckToAssetPrice(Amount.fromSigna(0.33).getPlanck(), 4)).toBe('3300');
            expect(convertPlanckToAssetPrice(Amount.fromSigna(1).getPlanck(), 4)).toBe('10000');
            expect(convertPlanckToAssetPrice(Amount.fromSigna(290).getPlanck(), 2)).toBe('290000000');
            expect(convertPlanckToAssetPrice(Amount.fromSigna(0).getPlanck(), 2)).toBe('0');
        });
    });
});
