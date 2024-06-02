import {generateSignature, verifySignature, generateSignKeys} from '../sign';

describe('Signing and Verifying messages', () => {

    it('Verify a signed message successfully', async () => {

        const keys = await generateSignKeys('testSecret');
        const hexMessage = Buffer.from('Some Test Message', 'utf-8').toString('hex');
        const signature = await generateSignature(hexMessage, keys.signPrivateKey);
        const verified = await verifySignature(signature, hexMessage, keys.publicKey);
        expect(verified).toBeTruthy();

    });

    it('Verify a signed message failure - with modified message', async () => {

        const keys = await generateSignKeys('testSecret');
        const hexMessage = Buffer.from('Some Test Message').toString('hex');
        const signature = await generateSignature(hexMessage, keys.signPrivateKey);
        const verified = await verifySignature(signature, hexMessage + '0A', keys.publicKey)
        expect(verified).toBeFalsy();

    });

    it('Verify a signed message failure - with different public key', async () => {

        const keys = await generateSignKeys('testSecret');
        const hexMessage = Buffer.from('Some Test Message').toString('hex');
        const signature = await generateSignature(hexMessage, keys.signPrivateKey);
        const {publicKey: wrongPublicKey } = await generateSignKeys('anotherSecret');
        const verified  = await verifySignature(signature, hexMessage, wrongPublicKey);
        expect(verified).toBeFalsy();

    });

});
