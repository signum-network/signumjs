import {generateMasterKeys} from '../__old__/generateMasterKeys';
import {generateSignature} from '../__old__/generateSignature';
import {Converter} from '../__old__/converter';
import {verifySignature} from '../__old__/verifySignature';

describe('Signing and Verifying messages', () => {

    it('Verify a signed message successfully', () => {

        const keys = generateMasterKeys('testSecret');
        const hexMessage = Converter.convertStringToHexString('Some Test Message');
        const signature = generateSignature(hexMessage, keys.signPrivateKey);

        expect(signature).toBeDefined();
        expect(signature.length).toBeGreaterThanOrEqual(1);

        expect(verifySignature(signature, hexMessage, keys.publicKey)).toBeTruthy();

    });

    it('Verify a signed message failure - with modified message', () => {

        const keys = generateMasterKeys('testSecret');
        const hexMessage = Converter.convertStringToHexString('Some Test Message');
        const signature = generateSignature(hexMessage, keys.signPrivateKey);

        expect(signature).toBeDefined();
        expect(signature.length).toBeGreaterThanOrEqual(1);

        expect(verifySignature(signature, hexMessage + '0A', keys.publicKey)).toBeFalsy();

    });

    it('Verify a signed message failure - with different public key', () => {

        const keys = generateMasterKeys('testSecret');
        const hexMessage = Converter.convertStringToHexString('Some Test Message');
        const signature = generateSignature(hexMessage, keys.signPrivateKey);

        expect(signature).toBeDefined();
        expect(signature.length).toBeGreaterThanOrEqual(1);

        const {publicKey: wrongPublicKey } = generateMasterKeys('anotherSecret');

        expect(verifySignature(signature, hexMessage, wrongPublicKey)).toBeFalsy();

    });

});
