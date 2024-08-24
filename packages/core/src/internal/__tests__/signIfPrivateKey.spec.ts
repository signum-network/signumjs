import {describe, afterEach, it, expect, vi} from "vitest"
import {signIfPrivateKey} from '../signIfPrivateKey';
import {HttpMockBuilder} from '@signumjs/http';
import {createChainService} from '../../__tests__/helpers';
import {TransactionId} from '../../typings/transactionId';
import {UnsignedTransaction} from '../../typings/unsignedTransaction';

// mocking
import {signAndBroadcastTransaction} from "../../api/factories/transaction/signAndBroadcastTransaction"
vi.mock('../../api/factories/transaction/signAndBroadcastTransaction', () => {
    return {
        signAndBroadcastTransaction: vi.fn().mockImplementation(() =>
            () => Promise.resolve({ transaction: 'transactionId' })
        ),
    };
});


describe('signIfPrivateKey', () => {

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should call signAndBroadcast if a private key is given', async () => {
        const httpMock = HttpMockBuilder.create().build();
        const service = createChainService(httpMock, 'relPath');


        // @ts-ignore
        const result = await signIfPrivateKey(service, {senderPrivateKey: 'senderPrivateKey', senderPublicKey: 'senderPublicKey'}, () => {
            return Promise.resolve({
                broadcasted: false,
                requestProcessingTime: 1,
                signatureHash: 'signatureHash',
                unsignedTransactionBytes: 'unsignedTransactionBytes',
                transactionJSON: {}
            });
        }) as TransactionId;

        expect(result).toEqual({transaction: 'transactionId'});
    });
    it('should not call signAndBroadcast if a private key is given', async () => {
        const httpMock = HttpMockBuilder.create().build();
        const service = createChainService(httpMock, 'relPath');

        // @ts-ignore
        const result = await signIfPrivateKey(service, {senderPublicKey: 'senderPublicKey'}, () => {
            return Promise.resolve({
                broadcasted: false,
                requestProcessingTime: 1,
                signatureHash: 'signatureHash',
                unsignedTransactionBytes: 'unsignedTransactionBytes',
                transactionJSON: {}
            });
        }) as UnsignedTransaction;

        expect(result).toEqual({
            broadcasted: false,
            requestProcessingTime: 1,
            signatureHash: 'signatureHash',
            unsignedTransactionBytes: 'unsignedTransactionBytes',
            transactionJSON: {}
        });

    });
});
