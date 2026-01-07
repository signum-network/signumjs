import {vi, describe, expect, it, beforeEach, afterEach, afterAll, Mock} from 'vitest';
import {FeeQuantPlanck} from '@signumjs/util';
import {HttpMockBuilder, Http} from '@signumjs/http';
import {ChainService} from '../../service/chainService';
import {createChainService} from '../../__tests__/helpers/createChainService';
import {sendEncryptedMessage} from '../factories/message/sendEncryptedMessage';
import {UnsignedTransaction} from '../../typings/unsignedTransaction';
import {sendMessage} from '../factories/message';

// mocking
import {signAndBroadcastTransaction} from '../../api/factories/transaction/signAndBroadcastTransaction';

vi.mock('../../api/factories/transaction/signAndBroadcastTransaction', () => {
    return {
        signAndBroadcastTransaction: vi.fn().mockImplementation(() =>
            () => Promise.resolve({transaction: 'transactionId'})
        ),
    };
});

import {encryptMessage} from '@signumjs/crypto/encryption';
vi.mock('@signumjs/crypto/encryption', () => {
    return {
        encryptMessage: vi.fn().mockImplementation(() => Promise.resolve(
            ({
                data: 'encryptedMessage',
                nonce: 'nonce'
            })
        ))
    };
});

describe('Message Api', () => {
    describe('sendMessage', () => {

        let httpMock: Http;
        let service: ChainService;

        beforeEach(() => {

            httpMock = HttpMockBuilder.create().onPostReply(200, {
                broadcasted: true,
                unsignedTransactionBytes: 'unsignedHexMessage'
            }).build();
            service = createChainService(httpMock, 'relPath');
            // @ts-ignore
            service.send = vi.fn(() => ({unsignedTransactionBytes: 'unsignedTransactionBytes'}));
        });

        afterEach(() => {
            // @ts-ignore
            httpMock.reset();
            (signAndBroadcastTransaction as Mock).mockClear()
        });

        afterAll(() => {
            vi.resetAllMocks();
        })

        it('should sendMessage', async () => {

            await sendMessage(service)({
                message: 'Message Text',
                feePlanck: '' + FeeQuantPlanck,
                recipientId: 'recipientId',
                recipientPublicKey: 'recipientPublicKey',
                senderPrivateKey: 'senderPrivateKey',
                senderPublicKey: 'senderPublicKey',
            });

            expect(signAndBroadcastTransaction).toBeCalledTimes(1);
            expect(service.send).toBeCalledWith('sendMessage', {
                broadcast: true,
                deadline: 1440,
                feeNQT: '1000000',
                message: 'Message Text',
                messageIsText: true,
                publicKey: 'senderPublicKey',
                recipient: 'recipientId',
                recipientPublicKey: 'recipientPublicKey',
            });
        });

        it('should return unsigned bytes when sendMessage called without private key', async () => {
            const unsignedTx = await sendMessage(service)({
                message: 'Message Text',
                feePlanck: '' + FeeQuantPlanck,
                recipientId: 'recipientId',
                recipientPublicKey: 'recipientPublicKey',
                senderPublicKey: 'senderPublicKey',
            }) as UnsignedTransaction;

            expect(signAndBroadcastTransaction).not.toBeCalled();
            expect(unsignedTx.unsignedTransactionBytes).toBe('unsignedTransactionBytes');
        });

        it('should sendEncryptedMessage', async () => {

            await sendEncryptedMessage(service)({
                message: 'Message Text',
                feePlanck: '' + FeeQuantPlanck,
                recipientId: 'recipientId',
                recipientPublicKey: 'recipientPublicKey',
                senderPrivateKey: 'senderPrivateKey',
                senderAgreementKey: 'senderAgreementKey',
                senderPublicKey: 'senderPublicKey'
            });

            expect(signAndBroadcastTransaction).toBeCalledTimes(1);
            expect(service.send).toBeCalledWith('sendMessage', {
                deadline: 1440,
                encryptedMessageData: 'encryptedMessage',
                encryptedMessageNonce: 'nonce',
                feeNQT: '1000000',
                messageToEncryptIsText: true,
                recipient: 'recipientId',
                recipientPublicKey: 'recipientPublicKey',
                publicKey: 'senderPublicKey'
            });
        });


        it('should return unsigneBytes when sendEncryptedMessage is called without private key', async () => {
            const unsignedTx = await sendEncryptedMessage(service)({
                message: 'Message Text',
                feePlanck: '' + FeeQuantPlanck,
                recipientId: 'recipientId',
                recipientPublicKey: 'recipientPublicKey',
                senderAgreementKey: 'senderAgreementKey',
                senderPublicKey: 'senderPublicKey'
            }) as UnsignedTransaction;

            expect(signAndBroadcastTransaction).not.toBeCalled();
            expect(service.send).toBeCalledWith('sendMessage', {
                deadline: 1440,
                encryptedMessageData: 'encryptedMessage',
                encryptedMessageNonce: 'nonce',
                feeNQT: '1000000',
                messageToEncryptIsText: true,
                recipient: 'recipientId',
                recipientPublicKey: 'recipientPublicKey',
                publicKey: 'senderPublicKey'
            });

            expect(unsignedTx.unsignedTransactionBytes).toBe('unsignedTransactionBytes');
        });

    });
});
