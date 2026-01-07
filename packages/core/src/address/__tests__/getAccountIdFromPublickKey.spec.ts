import {describe, expect, test} from 'vitest';
import {getAccountIdFromPublicKey} from '../getAccountIdFromPublicKey';

describe('Get Account Id from Public Key', () => {

    test('should compute the correct Account ID',() => {
        let accountId = getAccountIdFromPublicKey('7210b8941929030324540238450e985899989a7ad0267e0c76f668fde3b1016b');
        expect(accountId).toEqual('6502115112683865257');
        accountId = getAccountIdFromPublicKey('FCA79015A1E13C0ACF30C50CD459FDE91C4F6D488E85AB7200F7DF763580537B');
        expect(accountId).toEqual('13736966403016142704');
    });
});
