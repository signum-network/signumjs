import {assertAddress} from '../assertAddress';

describe('assertAddress', () => {
    it('should not throw on valid account Id`', () => {
        expect(() => {
            assertAddress('16107620026796983538');
        }).not.toThrow();
    });
    it('should throw on invalid account Id`', () => {
        expect(() => {
            assertAddress('1610');
        }).toThrow();
        expect(() => {
            assertAddress('1610762002679698353816107620026796983538');
        }).toThrow();
    });
    it('should not throw on valid RS address`', () => {
        expect(() => {
            assertAddress('S-9K9L-4CB5-88Y5-F5G4Z');
        }).not.toThrow();
        expect(() => {
            assertAddress('TS-9K9L-4CB5-88Y5-F5G4Z');
        }).not.toThrow();
        expect(() => {
            assertAddress('BURST-9K9L-4CB5-88Y5-F5G4Z');
        }).not.toThrow();
        expect(() => {
            assertAddress('SOMEPREFIX-9K9L-4CB5-88Y5-F5G4Z');
        }).not.toThrow();
    });
    it('should throw on valid RS address`', () => {
        expect(() => {
            assertAddress('S-9K9L-4CB5-88Y5-F5G4');
        }).toThrow();
        expect(() => {
            assertAddress('S-9K9L-4CB5-F5G4Z');
        }).toThrow();
        expect(() => {
            assertAddress('S-9K9L');
        }).toThrow();
    });
});
