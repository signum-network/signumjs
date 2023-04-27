import {Http, HttpMockBuilder} from '@signumjs/http';
import {createChainService} from '../../__tests__/helpers/createChainService';
import {
    publishContractByReference,
    getAllContractIds,
    getContract,
    getContractsByAccount,
    publishContract,
    getSingleContractMapValue, getContractMapValuesByFirstKey, getAllContractsByCodeHash
} from '../factories/contract';
import {signAndBroadcastTransaction} from '../factories/transaction/signAndBroadcastTransaction';
import {TransactionId} from '../../typings/transactionId';

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
            jest.resetAllMocks();
        });


        it('should publishContract', async () => {

            // @ts-ignore
            signAndBroadcastTransaction = jest.fn().mockImplementation(() => () => Promise.resolve({transaction: 'transactionId'}));

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
            jest.resetAllMocks();
        });


        it('should publish contract', async () => {

            // @ts-ignore
            signAndBroadcastTransaction = jest.fn().mockImplementation(() => () => Promise.resolve({transaction: 'transactionId'}));

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
});
