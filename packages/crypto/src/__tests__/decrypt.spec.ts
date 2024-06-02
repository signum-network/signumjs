import {generateSignKeys} from '../sign';
import {encryptData, encryptMessage} from '../encrypt';
import {decryptData, decryptMessage} from '../decrypt';
import {CryptoError} from '../typings/cryptoError';

describe('Encrypt and Decrypt - No Crypto-JS', () => {

    describe('Data', () => {

        it('should decrypt a data ciphertext successfully', async () => {

            const recipientKeys = await generateSignKeys('testSecret_Recipient');
            const senderKeys = await generateSignKeys('testSecret_Sender');

            const originalData = Uint8Array.from([0, 1, 2, 3]);

            const encrypted= await encryptData(
                originalData,
                recipientKeys.publicKey,
                senderKeys.agreementPrivateKey
            );

            const data = await decryptData(
                encrypted,
                senderKeys.publicKey,
                recipientKeys.agreementPrivateKey
            );

            expect(data).toEqual(originalData);
        });


        it('should not decrypt a data ciphertext, with wrong key', async () => {

            const recipientKeys = await generateSignKeys('testSecret_Recipient');
            const senderKeys = await generateSignKeys('testSecret_Sender');
            const bobKeys = await generateSignKeys('testSecret_Bob');

            const originalData = Uint8Array.from([0, 1, 2, 3]);

            const encrypted = await encryptData(
                originalData,
                recipientKeys.publicKey,
                senderKeys.agreementPrivateKey
            );

            try {
                await decryptData(
                    encrypted,
                    senderKeys.publicKey,
                    bobKeys.agreementPrivateKey
                );
                expect(false).toBe('Expected an exception');
            } catch (e) {
                expect(e instanceof CryptoError).toBeTruthy();
            }

        });
    });

    describe('Text', () => {

        it('should decrypt a text message successfully', async () => {

            const recipientKeys = await generateSignKeys('testSecret_Recipient');
            const senderKeys = await generateSignKeys('testSecret_Sender');

            // german umlauts to proof UTF-8
            const originalMessage = `Die Signum-Blockchain ist ein öffentliches Hauptbuch,
            das jede Transaktion aufzeichnet. Es ist vollständig verteilt und funktioniert
            ohne eine zentrale vertrauenswürdige Instanz:
            Die Blockchain wird von einem Netzwerk von Computern verwaltet,
            die als Knoten bezeichnet werden und die Burstcoin-Software ausführen.`;

            const encrypted = await encryptMessage(
                originalMessage,
                recipientKeys.publicKey,
                senderKeys.agreementPrivateKey
            );

            const message = await decryptMessage(
                encrypted,
                senderKeys.publicKey,
                recipientKeys.agreementPrivateKey
            );

            expect(message).toEqual(originalMessage);
        });


        it('should decrypt a text message successfully as owner of message', async () => {

            const recipientKeys = await generateSignKeys('testSecret_Recipient');
            const senderKeys = await generateSignKeys('testSecret_Sender');

            // german umlauts to proof UTF-8
            const originalMessage = `Die Burstcoin-Blockchain ist ein öffentliches Hauptbuch,
            das jede Transaktion aufzeichnet. Es ist vollständig verteilt und funktioniert
            ohne eine zentrale vertrauenswürdige Instanz:
            Die Blockchain wird von einem Netzwerk von Computern verwaltet,
            die als Knoten bezeichnet werden und die Burstcoin-Software ausführen.`;

            const encrypted = await encryptMessage(
                originalMessage,
                recipientKeys.publicKey,
                senderKeys.agreementPrivateKey
            );

            const message = await decryptMessage(
                encrypted,
                recipientKeys.publicKey,
                senderKeys.agreementPrivateKey
            );

            expect(message).toEqual(originalMessage);
        });


        it('should decrypt a text message sent with BRS successfully', async () => {

            const encrypted = {
                data: '8abb9c7b9c61edf877eb4576b1f19486cb7c5d5770b4d5e2ea14a0d5175ef46cd6a40c95925fc1e015bea65dc4b57d3c547bfd31a6889e3d4c33e34964a08427',
                nonce: '2983562ee782cd71bcb6d24ee8b0f25aa557fa2c54ba5890ebf0208bb1c35efe',
                isText: true
            };

            const message = await decryptMessage(
                encrypted,
                '7210b8941929030324540238450e985899989a7ad0267e0c76f668fde3b1016b',
                '5014cb242b904cb75d86bcc23bf73d9f91471a578d22d0fb5633361cfb6a7865'
            );

            expect(message).toEqual('Test Encrypted BRS Message');
        });

        it('should not decrypt a text message, when key is wrong', async () => {

            const recipientKeys = await generateSignKeys('testSecret_Recipient');
            const senderKeys = await generateSignKeys('testSecret_Sender');
            const bobKeys = await generateSignKeys('testSecret_Bob');

            const originalMessage = `Some message`;

            const encrypted = await encryptMessage(
                originalMessage,
                recipientKeys.publicKey,
                senderKeys.agreementPrivateKey
            );

            try {
                await decryptMessage(
                    encrypted,
                    senderKeys.publicKey,
                    bobKeys.agreementPrivateKey
                );
                expect(false).toBe('Expected exception');
            } catch (e) {
                expect(e instanceof CryptoError).toBeTruthy();
            }
        });

    });

});
