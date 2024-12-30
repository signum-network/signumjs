import {describe, afterEach, it, expect, vi, beforeEach} from 'vitest';
import {Http, HttpMockBuilder} from '@signumjs/http';
import {
    getUnconfirmedAccountTransactions,
    getAccountBalance,
    getAccountBlocks,
    getAccountBlockIds,
    generateSendTransactionQRCodeAddress,
    generateSendTransactionQRCode,
    getAccountTransactions,
    setAccountInfo,
    setRewardRecipient,
    getSubscriptionsToAccount,
    getAccountSubscriptions,
    getRewardRecipient,
    addCommitment,
    removeCommitment,
    getAccountTransactionsBetweenSenderAndRecipient,
    getAccountTransactionsFromSenderToRecipient, getAccountTransactionsFromSender, getAccountTransactionsToRecipient
} from '../factories/account';
import {createChainService} from '../../__tests__/helpers/createChainService';
import {Amount} from '@signumjs/util';

// mocking
import {signAndBroadcastTransaction} from '../../api/factories/transaction/signAndBroadcastTransaction';

vi.mock('../../api/factories/transaction/signAndBroadcastTransaction', () => {
    return {
        signAndBroadcastTransaction: vi.fn().mockImplementation(() =>
            () => Promise.resolve({transaction: 'transactionId'})
        ),
    };
});

import {generateSignature, generateSignedTransactionBytes, verifySignature} from '@signumjs/crypto';

vi.mock('@signumjs/crypto', () => {
    return {
        generateSignature: vi.fn().mockImplementation(() => 'signature'),
        generateSignedTransactionBytes: vi.fn().mockImplementation(() => 'signedTransactionBytes'),
        verifySignature: vi.fn().mockImplementation(() => true)
    };
});


describe('AccountApi', () => {

    let httpMock: Http;

    afterEach(() => {
        if (httpMock) {
            // @ts-ignore
            httpMock.reset();
        }
        vi.clearAllMocks();
    });

    describe('GetAccountTransactions()', () => {
        const mockedTransactions = {
            'requestProcessingTime': 738,
            'transactions': [{
                'senderPublicKey': 'spk',
                'signature': 'sign',
                'feeNQT': '5000000',
                'type': 1,
                'confirmations': 659,
                'fullHash': 'fh',
                'version': 1,
                'ecBlockId': '14044948199172881479',
                'signatureHash': 'sh',
                'attachment': {
                    'version.Message': 1,
                    'messageIsText': true,
                    'message': 'message'
                },
                'senderRS': 'BURST-ABC',
                'subtype': 0,
                'amountNQT': '0',
                'sender': '123',
                'recipientRS': 'BURST-DEF',
                'recipient': '456',
                'ecBlockHeight': 10,
                'block': '6204640184665879259',
                'blockTimestamp': 141094246,
                'deadline': 1440,
                'transaction': '123',
                'timestamp': 141094191,
                'height': 20
            }, {
                'senderPublicKey': 'spk',
                'signature': 'sign',
                'feeNQT': '5000000',
                'type': 1,
                'confirmations': 659,
                'fullHash': 'fh',
                'version': 1,
                'ecBlockId': '14044948199172881479',
                'signatureHash': 'sh',
                'attachment': {
                    'version.Message': 1,
                    'messageIsText': true,
                    'message': 'message'
                },
                'senderRS': 'BURST-ABC',
                'subtype': 0,
                'amountNQT': '0',
                'sender': '123',
                'recipientRS': 'BURST-DEF',
                'recipient': '456',
                'ecBlockHeight': 21,
                'block': '6204640184665879259',
                'blockTimestamp': 141094246,
                'deadline': 1440,
                'transaction': '123',
                'timestamp': 141094191,
                'height': 30
            }]
        };

        it('should getAccountTransaction without paging', async () => {
            httpMock = HttpMockBuilder.create().onGetReply(200, mockedTransactions).build();
            const service = createChainService(httpMock);
            const args = {accountId: 'accountId'};
            const transactions = await getAccountTransactions(service)(args);
            expect(transactions.requestProcessingTime).not.toBeNull();
            expect(transactions.transactions).toHaveLength(2);
            expect(transactions.transactions[0].height).toBe(20);
            expect(transactions.transactions[1].height).toBe(30);
        });

        it('should fail on getAccountTransaction', async () => {
            httpMock = HttpMockBuilder.create().onGetThrowError(404, 'Test Error').build();
            const service = createChainService(httpMock);
            try {
                const args = {accountId: 'accountId'};
                await getAccountTransactions(service)(args);
            } catch (e: any) {
                expect(e.status).toBe(404);
                expect(e.message).toBe('Test Error');
            }
        });

        it('should getAccountTransaction with paging', async () => {
            httpMock = HttpMockBuilder.create().onGetReply(200, mockedTransactions).build();
            const service = createChainService(httpMock);
            const args = {accountId: 'accountId', firstIndex: 0, lastIndex: 10};
            const transactions = await getAccountTransactions(service)(args);
            expect(transactions.requestProcessingTime).not.toBeNull();
            expect(transactions.transactions).toHaveLength(2);
            expect(transactions.transactions[0].height).toBe(20);
            expect(transactions.transactions[1].height).toBe(30);
        });

        it('should getAccountTransaction with number of confirmations', async () => {
            httpMock = HttpMockBuilder.create().onGetReply(200, mockedTransactions).build();
            const service = createChainService(httpMock);
            const args = {accountId: 'accountId', confirmations: 10};
            const transactions = await getAccountTransactions(service)(args);
            expect(transactions.requestProcessingTime).not.toBeNull();
            expect(transactions.transactions).toHaveLength(2);
            expect(transactions.transactions[0].height).toBe(20);
            expect(transactions.transactions[1].height).toBe(30);
        });

        it('should getAccountTransactions use correctly with senderId and recipientid', async () => {
            httpMock = HttpMockBuilder.create().onGetReply(200, [], 'relPath?requestType=getAccountTransactions&bidirectional=true&sender=senderId&recipient=recipientId').build();

            const service = createChainService(httpMock, 'relPath');
            await getAccountTransactions(service)({
                accountId: null,
                recipientId: 'recipientId',
                senderId: 'senderId',
                bidirectional: true,
            });
        });

        it('should throw when getAccountTransactions use incorrectly with senderId and recipientid', async () => {
            httpMock = HttpMockBuilder.create().onGetReply(200, [], 'relPath?requestType=getAccountTransactions&bidirectional=true&sender=senderId&recipient=recipientId').build();

            const service = createChainService(httpMock, 'relPath');
            await expect(() =>
                getAccountTransactions(service)({
                    accountId: 'accountId',
                    recipientId: 'recipientId',
                    senderId: 'senderId',
                    bidirectional: true,
                })).rejects.toThrowError('Using accountId with recipientId and/or senderId is not allowed');
        });

        it('should throw when getAccountTransactions use incorrectly with senderId and recipientid - no resolve allowed', async () => {
            httpMock = HttpMockBuilder.create().onGetReply(200, [], 'relPath?requestType=getAccountTransactions&bidirectional=true&sender=senderId&recipient=recipientId').build();

            const service = createChainService(httpMock, 'relPath');
            await expect(() =>
                getAccountTransactions(service)({
                    accountId: null,
                    resolveDistributions: true,
                    recipientId: 'recipientId',
                    senderId: 'senderId',
                    bidirectional: true,
                })).rejects.toThrowError('Using resolveDistributions with recipientId and/or senderId is not allowed');
        });

    });


    describe('getAccountTransactionsBetweenSenderAndRecipient()', () => {

        it('should GetAccountTransactionsFromSenderToRecipient', async () => {
            httpMock = HttpMockBuilder.create().onGetReply(200, [], 'relPath?requestType=getAccountTransactions&sender=senderId&recipient=recipientId&bidirectional=true').build();

            const service = createChainService(httpMock, 'relPath');
            const args = {senderId: 'senderId', recipientId: 'recipientId'};
            await getAccountTransactionsBetweenSenderAndRecipient(service)(args);
        });

    });

    describe('getAccountTransactionsFromSenderToRecipient()', () => {

        it('should getAccountTransactionsFromSenderToRecipient', async () => {
            httpMock = HttpMockBuilder.create().onGetReply(200, [], 'relPath?requestType=getAccountTransactions&sender=senderId&recipient=recipientId&bidirectional=false').build();

            const service = createChainService(httpMock, 'relPath');
            const args = {senderId: 'senderId', recipientId: 'recipientId'};
            await getAccountTransactionsFromSenderToRecipient(service)(args);
        });

    });

    describe('getAccountTransactionsFromSender()', () => {

        it('should getAccountTransactionsFromSender', async () => {
            httpMock = HttpMockBuilder.create().onGetReply(200, [], 'relPath?requestType=getAccountTransactions&sender=senderId').build();

            const service = createChainService(httpMock, 'relPath');
            const args = {senderId: 'senderId'};
            await getAccountTransactionsFromSender(service)(args);
        });

    });

    describe('getAccountTransactionsToRecipient()', () => {

        it('should getAccountTransactionsToRecipient', async () => {
            httpMock = HttpMockBuilder.create().onGetReply(200, [], 'relPath?requestType=getAccountTransactions&recipient=recipientId').build();

            const service = createChainService(httpMock, 'relPath');
            const args = {recipientId: 'recipientId'};
            await getAccountTransactionsToRecipient(service)(args);
        });

    });

    describe('GetUnconfirmedAccountTransactions()', () => {
        const mockedTransactions = {
            'requestProcessingTime': 738,
            'unconfirmedTransactions': [{
                'senderPublicKey': 'spk',
                'signature': 'sign',
                'feeNQT': '5000000',
                'type': 1,
                'confirmations': 0,
                'fullHash': 'fh',
                'version': 1,
                'ecBlockId': '14044948199172881479',
                'signatureHash': 'sh',
                'attachment': {
                    'version.Message': 1,
                    'messageIsText': true,
                    'message': 'message'
                },
                'senderRS': 'BURST-ABC',
                'subtype': 0,
                'amountNQT': '0',
                'sender': '123',
                'recipientRS': 'BURST-DEF',
                'recipient': '456',
                'ecBlockHeight': 10,
                'block': '6204640184665879259',
                'blockTimestamp': 141094246,
                'deadline': 1440,
                'transaction': '123',
                'timestamp': 141094191,
                'height': 20
            }
            ]
        };

        it('should getUnconfirmedAccountTransactions', async () => {
            httpMock = HttpMockBuilder.create().onGetReply(200, mockedTransactions).build();
            const service = createChainService(httpMock);
            const transactions = await getUnconfirmedAccountTransactions(service)('accountId');
            expect(transactions.requestProcessingTime).not.toBeNull();
            expect(transactions.unconfirmedTransactions).toHaveLength(1);
        });

        it('should fail on getUnconfirmedAccountTransactions', async () => {
            httpMock = HttpMockBuilder.create().onGetThrowError(404, 'Test Error').build();
            const service = createChainService(httpMock);
            try {
                await getUnconfirmedAccountTransactions(service)('accountId');
            } catch (e: any) {
                expect(e.status).toBe(404);
                expect(e.message).toBe('Test Error');
            }
        });
    });

    describe('GetAccountBalance', () => {

        it('should getAccountBalance', async () => {
            const mockedBalance = {
                unconfirmedBalanceNQT: '100000000000',
                guaranteedBalanceNQT: '100000000000',
                effectiveBalanceNXT: '100000000000',
                forgedBalanceNQT: '0',
                balanceNQT: '100000000000',
                requestProcessingTime: 0
            };

            httpMock = HttpMockBuilder.create().onGetReply(200, mockedBalance).build();
            const service = createChainService(httpMock);
            const balance = await getAccountBalance(service)('accountId');
            expect(balance.requestProcessingTime).toBe(0);
            expect(balance.unconfirmedBalanceNQT).toBe('100000000000');
            expect(balance.guaranteedBalanceNQT).toBe('100000000000');
            expect(balance.effectiveBalanceNXT).toBe('100000000000');
            expect(balance.balanceNQT).toBe('100000000000');
            expect(balance.forgedBalanceNQT).toBe('0');
        });

        it('should fail getAccountBalance', async () => {
            httpMock = HttpMockBuilder.create().onGetThrowError(404, 'Test Error').build();
            const service = createChainService(httpMock);
            try {
                await getAccountBalance(service)('accountId');
            } catch (e: any) {
                expect(e.status).toBe(404);
                expect(e.message).toBe('Test Error');
            }
        });
    });

    describe('generateSendTransactionQRCode', () => {
        const mockAddress = `BURST-K8MA-U2JT-R6DJ-FVQLC`;

        it('should expose a method for constructing the URL', async () => {
            // tslint:disable-next-line
            const expected = 'relPath?requestType=generateSendTransactionQRCode&receiverId=BURST-K8MA-U2JT-R6DJ-FVQLC&amountNQT=0&feeSuggestionType=standard';
            const service = createChainService(httpMock, 'relPath');
            const generatedImageUrl = await generateSendTransactionQRCodeAddress(service)(mockAddress);
            expect(generatedImageUrl).toBe(expected);
        });

        it('should fetch the QR image', async () => {
            const mockedImage = new ArrayBuffer(1337);
            httpMock = HttpMockBuilder.create().onGetReply(200, mockedImage).build();
            const service = createChainService(httpMock);
            const generatedImage = await generateSendTransactionQRCode(service)(mockAddress);
            expect(generatedImage.byteLength).toBe(1337);
        });

        it('should fail generateSendTransactionQRCode', async () => {
            httpMock = HttpMockBuilder.create().onGetThrowError(404, 'Test Error').build();
            const service = createChainService(httpMock);
            try {
                await generateSendTransactionQRCode(service)(mockAddress);
            } catch (e: any) {
                expect(e.status).toBe(404);
                expect(e.message).toBe('Test Error');
            }
        });
    });

    describe('setAccountInfo', () => {
        let service;

        const mockBroadcastResponse = {
            broadcasted: true,
            unsignedTransactionBytes: 'unsignedHexMessage'
        };

        beforeEach(() => {
            httpMock = HttpMockBuilder.create()
                // tslint:disable:max-line-length
                .onPostReply(200, mockBroadcastResponse,
                    'relPath?requestType=setAccountInfo&name=name&description=description&deadline=1440&feeNQT=100000000&publicKey=senderPublicKey')
                .onPostReply(200, 'fakeTransaction',
                    'relPath?requestType=broadcastTransaction&transactionBytes=signedTransactionBytes')
                .build();

            service = createChainService(httpMock, 'relPath');
        });

        afterEach(() => {
            // @ts-ignore
            httpMock.reset();
        });

        it('should setAccountInfo', async () => {
            const status = await setAccountInfo(service)({
                name: 'name',
                description: 'description',
                feePlanck: Amount.fromSigna(1).getPlanck(),
                senderPublicKey: 'senderPublicKey',
                senderPrivateKey: 'senderPrivateKey'
            });
            expect(status).toEqual({transaction: 'transactionId'});
            expect(signAndBroadcastTransaction).toBeCalledTimes(1);
        });
    });

    describe('setRewardRecipient', () => {
        let service;

        const mockBroadcastResponse = {
            broadcasted: true,
            unsignedTransactionBytes: 'unsignedHexMessage'
        };

        beforeEach(() => {
            httpMock = HttpMockBuilder.create()
                // tslint:disable:max-line-length
                .onPostReply(200, mockBroadcastResponse,
                    'relPath?requestType=setRewardRecipient&publicKey=senderPublicKey&recipient=recipient&feeNQT=12300000000&deadline=1440')
                .onPostReply(200, 'fakeTransaction',
                    'relPath?requestType=broadcastTransaction&transactionBytes=signedTransactionBytes')
                .build();

            service = createChainService(httpMock, 'relPath');
        });

        afterEach(() => {
            // @ts-ignore
            httpMock.reset();
            vi.clearAllMocks();
        });

        it('should setRewardRecipient', async () => {
            const status = await setRewardRecipient(service)({
                feePlanck: Amount.fromSigna(123).getPlanck(),
                recipientId: 'recipient',
                senderPrivateKey: 'senderPrivateKey',
                senderPublicKey: 'senderPublicKey',
            });

            expect(status).toEqual({transaction: 'transactionId'});
            expect(signAndBroadcastTransaction).toBeCalledTimes(1);
        });

        it('should throw error if response contains one', async () => {
            mockBroadcastResponse.unsignedTransactionBytes = undefined;
            // @ts-ignore
            mockBroadcastResponse.error = 'error';
            try {
                await setRewardRecipient(service)(
                    {
                        feePlanck: Amount.fromSigna(123).getPlanck(),
                        recipientId: 'recipient',
                        senderPrivateKey: 'senderPrivateKey',
                        senderPublicKey: 'senderPublicKey',
                    }
                );
            } catch (e: any) {
                expect(e.message).toBe('error');
                expect(generateSignature).toBeCalledTimes(0);
                expect(verifySignature).toBeCalledTimes(0);
                expect(generateSignedTransactionBytes).toBeCalledTimes(0);
            }
        });
    });

    describe('getAccountBlocks()', () => {
        it('should getAccountBlocks', async () => {
            httpMock = HttpMockBuilder.create().onGetReply(
                200,
                {blocks: []}, // no need to test the mocked result... focus is the correctly mounted url
                '/api?requestType=getAccountBlocks&account=accountId&firstIndex=1000&lastIndex=0&includeTransactions=true'
            ).build();
            const service = createChainService(httpMock);
            const blockResponse = await getAccountBlocks(service)({
                accountId: 'accountId',
                lastIndex: 0,
                firstIndex: 1000,
                includeTransactions: true
            });
            expect(blockResponse.blocks).toEqual([]);
        });

        it('should getAccountBlockIds', async () => {
            httpMock = HttpMockBuilder.create().onGetReply(
                200,
                {blockIds: ['123', '456']},
                '/api?requestType=getAccountBlockIds&account=accountId&firstIndex=1000&lastIndex=0&includeTransactions=true'
            ).build();
            const service = createChainService(httpMock);
            const blockResponse = await getAccountBlockIds(service)({
                accountId: 'accountId',
                lastIndex: 0,
                firstIndex: 1000,
                includeTransactions: true
            });
            expect(blockResponse.blockIds[0]).toBe('123');
        });

    });

    describe('getAccountSubscriptions()', () => {

        const mockedSubscriptions = {
            'subscriptions': [
                {
                    'id': '11351503202575283428',
                    'sender': '6502115112683865257',
                    'senderRS': 'BURST-K37B-9V85-FB95-793HN',
                    'recipient': '11089308770178933578',
                    'recipientRS': 'BURST-9AUC-LCKL-7W2D-B5BTM',
                    'amountNQT': '100000000',
                    'frequency': 3600,
                    'timeNext': 175560749
                }
            ],
            'requestProcessingTime': 17
        };

        it('should get sender subscriptions', async () => {
            httpMock = HttpMockBuilder.create().onGetReply(200, mockedSubscriptions).build();
            const service = createChainService(httpMock);
            const subscriptionList = await getAccountSubscriptions(service)('1');
            expect(subscriptionList.subscriptions).toEqual(mockedSubscriptions.subscriptions);
        });

    });

    describe('getSubscriptionsToAccount()', () => {

        const mockedSubscriptions = {
            'subscriptions': [
                {
                    'id': '11351503202575283428',
                    'sender': '6502115112683865257',
                    'senderRS': 'BURST-K37B-9V85-FB95-793HN',
                    'recipient': '11089308770178933578',
                    'recipientRS': 'BURST-9AUC-LCKL-7W2D-B5BTM',
                    'amountNQT': '100000000',
                    'frequency': 3600,
                    'timeNext': 175560749
                }
            ],
            'requestProcessingTime': 17
        };

        it('should get receiver subscriptions', async () => {
            httpMock = HttpMockBuilder.create().onGetReply(200, mockedSubscriptions).build();
            const service = createChainService(httpMock);
            const subscriptionList = await getSubscriptionsToAccount(service)('1');
            expect(subscriptionList.subscriptions).toEqual(mockedSubscriptions.subscriptions);
        });

    });

    describe('getRewardRecipient()', () => {

        const mockedRecipient = {
            'rewardRecipient': '1',
            'requestProcessingTime': 17
        };

        it('should get reward recipient', async () => {
            httpMock = HttpMockBuilder.create().onGetReply(200, mockedRecipient).build();
            const service = createChainService(httpMock);
            const rewardRecipient = await getRewardRecipient(service)('1');
            expect(rewardRecipient).toEqual(mockedRecipient);
        });

    });

    describe('add/removeCommitment()', () => {

        let service;

        const mockBroadcastResponse = {
            broadcasted: true,
            unsignedTransactionBytes: 'unsignedHexMessage'
        };

        beforeEach(() => {

            httpMock = HttpMockBuilder.create()
                .onPostReply(200, mockBroadcastResponse,
                    'relPath?requestType=addCommitment&amountNQT=10000000000&publicKey=senderPublicKey&feeNQT=100000000&deadline=1440')
                .onPostReply(200, mockBroadcastResponse,
                    'relPath?requestType=removeCommitment&amountNQT=10000000000&publicKey=senderPublicKey&feeNQT=100000000&deadline=1440')
                .build();

            service = createChainService(httpMock, 'relPath');
        });

        afterEach(() => {
            // @ts-ignore
            httpMock.reset();
            vi.clearAllMocks();
        });

        it('should add commitment', async () => {
            const amount = Amount.fromSigna(100);
            const fee = Amount.fromSigna(1);
            const status = await addCommitment(service)({
                feePlanck: fee.getPlanck(),
                amountPlanck: amount.getPlanck(),
                senderPrivateKey: 'senderPrivateKey',
                senderPublicKey: 'senderPublicKey',
            });

            expect(status).toEqual({transaction: 'transactionId'});
        });

        it('should remove commitment', async () => {
            const amount = Amount.fromSigna(100);
            const fee = Amount.fromSigna(1);
            const status = await removeCommitment(service)({
                feePlanck: fee.getPlanck(),
                amountPlanck: amount.getPlanck(),
                senderPrivateKey: 'senderPrivateKey',
                senderPublicKey: 'senderPublicKey',
            });
            expect(status).toEqual({transaction: 'transactionId'});
        });

    });
})
;
