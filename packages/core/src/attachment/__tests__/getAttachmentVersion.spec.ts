import {describe, it, expect} from "vitest"
import {getAttachmentVersion} from '../getAttachmentVersion';
import {Transaction} from '../../typings/transaction';

describe('getAttachmentVersion', () => {

    it('return the correct version string', () => {
        const transaction = {
            transaction: '123',
            attachment: {'version.AliasAssignment': 1, foo: 1}
        } as Transaction;

        expect( getAttachmentVersion(transaction, "AliasAssignment")).toBe(1);

    });

    it('returns undefined in case of not existing attachment', () => {
        const transaction = {
            transaction: '123'
        } as Transaction;
        expect(getAttachmentVersion(transaction, "AliasAssignment")).toBe(0);
    });

    it('return undefined in case of not existing version', () => {
        const transaction = {
            transaction: '123',
            attachment: {foo: 123}
        } as Transaction;
        expect(getAttachmentVersion(transaction, "AliasAssignment")).toBe(0);
    });
});
