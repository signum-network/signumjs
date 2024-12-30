import {vi, expect, afterEach, describe, it, beforeEach} from "vitest";
import {Http, HttpMockBuilder} from '@signumjs/http';
import {createChainService} from '../../__tests__/helpers/createChainService';
import {
    publishContractByReference,
    getAllContractIds,
    getContract,
    getContractsByAccount,
    publishContract,
    getSingleContractMapValue, getContractMapValuesByFirstKey, getAllContractsByCodeHash, callContractMethod
} from '../factories/contract';
import {TransactionId} from '../../typings/transactionId';

// mocking
import {signAndBroadcastTransaction} from "../../api/factories/transaction/signAndBroadcastTransaction"
vi.mock('../../api/factories/transaction/signAndBroadcastTransaction', () => {
    return {
        signAndBroadcastTransaction: vi.fn().mockImplementation(() =>
            () => Promise.resolve({ transaction: 'transactionId' })
        ),
    };
});

describe('Contract Api', () => {

    let httpMock: Http;

    afterEach(() => {
        if (httpMock) {
            // @ts-ignore
            httpMock.reset();
        }
    });

    const testContract = {
        creator: 'creator',
        creatorRS: 'CreatorRS',
        at: 'at',
        atRS: 'atRS',
        atVersion: 1,
        name: 'Name',
        description: 'description',
        machineCode: 'machineCode',
        machineData: 'machineData',
        balanceNQT: '0',
        prevBalanceNQT: '0',
        nextBlock: 2,
        frozen: true,
        running: true,
        stopped: false,
        finished: false,
        dead: false,
        minActivation: '1000',
        creationBlock: 1,
        requestProcessingTime: 1
    };

    describe('getContract', () => {

        it('should getContract', async () => {
            httpMock = HttpMockBuilder.create().onGetReply(200, testContract).build();
            const service = createChainService(httpMock, 'relPath');
            const contract = await getContract(service)('1234');
            expect(contract.creator).toBe('creator');
            expect(contract.at).toBe('at');
            // rest is implicit
        });
    });

    describe('getContractsByAccount', () => {

        const testContracts = {
            ats: [testContract],
            requestProcessingTime: 1
        };

        it('should getContractsByAccount', async () => {
            httpMock = HttpMockBuilder.create()
                .onGetReply(200, testContracts, 'relPath?requestType=getAccountATs&account=1234&machineCodeHashId=machinCodeHash')
                .build();
            const service = createChainService(httpMock, 'relPath');
            const contracts = await getContractsByAccount(service)({ accountId: '1234', machineCodeHash: 'machinCodeHash'});
            expect(contracts.ats).toHaveLength(1);
            expect(contracts.ats[0]).toEqual(testContract);
        });
    });

    describe('getAllContractIds', () => {

        const testContracts = {
            atIds: [testContract],
            requestProcessingTime: 1
        };

        it('should getAllContractIds', async () => {
            httpMock = HttpMockBuilder.create()
                .onGetReply(200, testContracts, 'relPath?requestType=getATIds&machineCodeHashId=machinCodeHash')
                .build();
            const service = createChainService(httpMock, 'relPath');
            const contracts = await getAllContractIds(service)({ machineCodeHash: 'machinCodeHash'});
            expect(contracts.atIds).toHaveLength(1);
            expect(contracts.atIds[0]).toEqual(testContract);
        });
    });


    describe('publishContract', () => {

        beforeEach(() => {
            vi.resetAllMocks();
        });


        it('should publishContract', async () => {

            // @ts-ignore
            signAndBroadcastTransaction = vi.fn().mockImplementation(() => () => Promise.resolve({transaction: 'transactionId'}));

            const testResponse = {
                broadcasted: true,
                unsignedTransactionBytes: 'unsignedHexMessage'
            };

            httpMock = HttpMockBuilder.create()
                .onPostReply(200, testResponse, 'relPath?requestType=createATProgram&code=creationBytes&deadline=1440&description=description&feeNQT=40000000&minActivationAmountNQT=20000000&name=testContract&publicKey=publickey&dpages=1&cspages=1&uspages=1&broadcast=true').build();


            const service = createChainService(httpMock, 'relPath');
            const {transaction} = await publishContract(service)({
                activationAmountPlanck: '20000000',
                codeHex: 'creationBytes',
                description: 'description',
                name: 'testContract',
                senderPublicKey: 'publickey',
                senderPrivateKey: 'privateKey',
                feePlanck: ''
            }) as TransactionId;
            expect(transaction).toEqual('transactionId');
        });
    });


    describe('publishContractByReference', () => {

        beforeEach(() => {
            vi.resetAllMocks();
        });

        it('should publish contract', async () => {

            // @ts-ignore
            signAndBroadcastTransaction = vi.fn().mockImplementation(() => () => Promise.resolve({transaction: 'transactionId'}));

            const testResponse = {
                broadcasted: true,
                unsignedTransactionBytes: 'unsignedHexMessage'
            };

            httpMock = HttpMockBuilder.create()
                .onPostReply(200, testResponse, 'relPath?requestType=createATProgram&deadline=1440&description=description&feeNQT=feePlanck&referencedTransactionFullHash=referencedTransactionId&name=testContract&publicKey=publickey&broadcast=true').build();

            const service = createChainService(httpMock, 'relPath');
            const {transaction} = await publishContractByReference(service)({
                referencedTransactionHash: 'referencedTransactionId',
                feePlanck: 'feePlanck',
                description: 'description',
                name: 'testContract',
                senderPublicKey: 'publickey',
                senderPrivateKey: 'privateKey',
            }) as TransactionId;
            expect(transaction).toEqual('transactionId');
        });
    });

    describe('getSingleContractMapValue', () => {

        const mockResponse = {
            value: '42',
            requestProcessingTime: 1
        };

        it('should getSingleContractMapValue', async () => {
            httpMock = HttpMockBuilder.create()
                .onGetReply(200, mockResponse, 'relPath?requestType=getATMapValue&at=contractId&key1=key1&key2=key2')
                .build();
            const service = createChainService(httpMock, 'relPath');
            const mapValue = await getSingleContractMapValue(service)({ contractId: 'contractId', key1: 'key1', key2: 'key2'});
            expect(mapValue.value).toEqual('42');
        });
    });

    describe('getContractMapValuesByFirstKey', () => {

        const mockResponse = {

            keyValues: [{
                key2: '12325346463645',
                value: '42'
            }],
            requestProcessingTime: 1
        };

        it('should getContractMapValuesByFirstKey', async () => {
            httpMock = HttpMockBuilder.create()
                .onGetReply(200, mockResponse, 'relPath?requestType=getATMapValues&at=contractId&key1=key1')
                .build();
            const service = createChainService(httpMock, 'relPath');
            const mapValues = await getContractMapValuesByFirstKey(service)({ contractId: 'contractId', key1: 'key1'});
            expect(mapValues.keyValues[0].value).toEqual('42');
        });
    });

    describe('getAllContractsByCodeHash', () => {

        const mockResponse = {
            ats: [],
            requestProcessingTime: 1
        };

        it('should getAllContracts', async () => {
            httpMock = HttpMockBuilder.create()
                .onGetReply(200, mockResponse, 'relPath?requestType=getATs&machineCodeHashId=machineCodeHash&includeDetails=true&firstIndex=100&lastIndex=600')
                .build();
            const service = createChainService(httpMock, 'relPath');
            const contractList = await getAllContractsByCodeHash(service)({
                machineCodeHash: 'machineCodeHash',
                includeDetails: true,
                firstIndex: 100,
                lastIndex: 600
            });
            expect(contractList.ats).toHaveLength(0);
        });
    });

    describe('callContractMethod', () => {

        const mockResponse = {
            transaction: 'transaction',
            requestProcessingTime: 1
        };

        it('should getAllContracts using signa only', async () => {

            httpMock = HttpMockBuilder.create()
                .onPostReply(200, mockResponse,
                    'relPath?requestType=sendMoney&message=640000000000000001000000000000000200000000000000&messageIsText=false&amountNQT=2000&publicKey=senderPublicKey&recipient=contractId&feeNQT=feePlanck&deadline=1440'
                )
                .build();
            const service = createChainService(httpMock, 'relPath');
            const contractList = await callContractMethod(service)({
                contractId: 'contractId',
                feePlanck: 'feePlanck',
                methodId: '100',
                methodArgs: ['1','2'],
                senderPrivateKey: 'senderPrivateKey',
                senderPublicKey: 'senderPublicKey',
                amountPlanck: '2000',
                skipAdditionalSecurityCheck: true
            }) as TransactionId;
            expect(contractList.transaction).toMatch('transaction');
        });

        it('should getAllContracts using tokens', async () => {
            httpMock = HttpMockBuilder.create()
                .onPostReply(200, mockResponse,
                    'relPath?requestType=transferAsset&message=640000000000000001000000000000000200000000000000&messageIsText=false&asset=assetId&quantityQNT=1000000&publicKey=senderPublicKey&recipient=contractId&feeNQT=feePlanck&amountNQT=assetId&deadline=1440',
                )
                .build();
            const service = createChainService(httpMock, 'relPath');
            const contractList = await callContractMethod(service)({
                contractId: 'contractId',
                feePlanck: 'feePlanck',
                methodId: '100',
                methodArgs: ['1','2'],
                senderPrivateKey: 'senderPrivateKey',
                senderPublicKey: 'senderPublicKey',
                amountPlanck: '2000',
                assetId: 'assetId',
                assetQuantity: '1000000',
                skipAdditionalSecurityCheck: true
            }) as TransactionId;
            expect(contractList.transaction).toMatch('transaction');
        });
    });
});
