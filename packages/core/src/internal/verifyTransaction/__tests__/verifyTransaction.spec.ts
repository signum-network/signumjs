import {verifyTransaction} from '../index';
import {DefaultSendArgs} from '../../../typings/args/defaultSendArgs';
import {UnsignedTransaction} from '../../../typings/unsignedTransaction';

describe('verifyTransaction', function () {
    it('should pass verification as expected', () => {
        const mockTx: DefaultSendArgs = {
            referencedTransactionFullHash: 'referencedTransactionFullHash',
            feePlanck: '100000',
            senderPublicKey: 'senderPublicKey',
            deadline: 1400
        };

        const testResponse: UnsignedTransaction = {
            unsignedTransactionBytes: 'bytes',
            broadcasted: false,
            signatureHash: 'hash',
            transactionJSON: {},
            requestProcessingTime: 42
        };

        expect(() => {
            verifyTransaction(mockTx, testResponse);
        }).not.toThrow();
    });
    it('should throw exception when server response does not match', () => {

        const mockTx: DefaultSendArgs = {
            referencedTransactionFullHash: 'referencedTransactionFullHash',
            feePlanck: '100000',
            senderPublicKey: 'senderPublicKey',
            deadline: 1400
        };

        const testResponse: UnsignedTransaction = {
            unsignedTransactionBytes: 'bytes',
            broadcasted: false,
            signatureHash: 'hash',
            transactionJSON: {},
            requestProcessingTime: 42
        };
        expect(() => {
            verifyTransaction(mockTx, testResponse);
        }).toThrow('Verification failed - Node Response does not match transaction parameters');
    });
});
