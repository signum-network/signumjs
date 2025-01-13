import {describe, expect, test} from 'vitest';

import {generateSignature, verifySignature, generateSignKeys, getAccountIdFromPublicKey} from '../sign';

describe('Signing and Verifying messages', () => {

    test('Verify a signed message successfully', () => {

        const keys = generateSignKeys('testSecret');
        const hexMessage = Buffer.from('Some Test Message', 'utf-8').toString('hex');
        const signature = generateSignature(hexMessage, keys.signPrivateKey);
        const verified = verifySignature(signature, hexMessage, keys.publicKey);
        expect(verified).toBeTruthy();

    });

    test('Verify a signed message failure - with modified message', () => {

        const keys = generateSignKeys('testSecret');
        const hexMessage = Buffer.from('Some Test Message').toString('hex');
        const signature = generateSignature(hexMessage, keys.signPrivateKey);
        const verified =  verifySignature(signature, hexMessage + '0A', keys.publicKey);
        expect(verified).toBeFalsy();

    });

    test('Verify a signed message failure - with different public key',  () => {

        const keys =  generateSignKeys('testSecret');
        const hexMessage = Buffer.from('Some Test Message').toString('hex');
        const signature =  generateSignature(hexMessage, keys.signPrivateKey);
        const {publicKey: wrongPublicKey} =  generateSignKeys('anotherSecret');
        const verified =  verifySignature(signature, hexMessage, wrongPublicKey);
        expect(verified).toBeFalsy();

    });
});


describe('Get Account Id from Public Key', () => {

    test('should compute the correct Account ID',() => {
        let accountId = getAccountIdFromPublicKey('7210b8941929030324540238450e985899989a7ad0267e0c76f668fde3b1016b');
        expect(accountId).toEqual('6502115112683865257');
        accountId = getAccountIdFromPublicKey('FCA79015A1E13C0ACF30C50CD459FDE91C4F6D488E85AB7200F7DF763580537B');
        expect(accountId).toEqual('13736966403016142704');
    });
});
