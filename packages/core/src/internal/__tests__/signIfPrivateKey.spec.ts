import {signIfPrivateKey} from '../signIfPrivateKey';
import {generateSignature, generateSignedTransactionBytes, verifySignature} from '@signumjs/crypto';
import {HttpMockBuilder} from '@signumjs/http';
import {createChainService} from '../../__tests__/helpers';
import {signAndBroadcastTransaction} from '../../api/factories/transaction/signAndBroadcastTransaction';
import {TransactionId} from '../../typings/transactionId';
import {ChainService} from '../../service';
import {UnsignedTransaction} from '../../typings/unsignedTransaction';

describe('signIfPrivateKey', () => {

    beforeEach(() => {
        jest.resetAllMocks();
        // @ts-ignore
        signAndBroadcastTransaction = jest.fn((service: ChainService) => (unsigned: string) => Promise.resolve({transaction: 'transaction'}));
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

        expect(result).toEqual({transaction: 'transaction'});
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
