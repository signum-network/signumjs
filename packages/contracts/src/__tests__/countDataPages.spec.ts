import {countDataPages} from '../countDataPages';

describe('countDataPages', () => {
    it('counts data pages as expected', () => {
        expect(countDataPages('xx'.repeat(513))).toBe(3);
        expect(countDataPages('xx'.repeat(300))).toBe(2);
        expect(countDataPages('xx'.repeat(1))).toBe(1);
    });
});
