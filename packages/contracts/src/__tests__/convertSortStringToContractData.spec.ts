import {convertShortStringToContractData} from '../convertShortStringToContractData';

describe('convertShortStringToContractData', () => {
    it('generates a valid contract data argument', () => {
        const message = convertShortStringToContractData('ShortMsg');
        expect(message).toBe('7454386970759751763');
    });
    it('throws if message too big', () => {
        expect(() => convertShortStringToContractData('LongInvalidMsg')).toThrow();
    });
});
