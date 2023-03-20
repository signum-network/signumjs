/* tslint:disable:quotemark */
import {HttpMockBuilder, Http} from '@signumjs/http';
import {
    getAliasById,
    getAliasesOnSale,
    buyAlias,
    sellAlias,
    getAliasByName, buyTopLevelDomain, getTopLevelDomains, setAlias, getAliases
} from '../factories';
import {mockSignAndBroadcastTransaction, createChainService} from '../../__tests__/helpers';
import {searchAliasesByName} from '../factories/alias/searchAliasesByName';
import {AttachmentMessage} from '../../typings/attachment';

describe('Alias Api', () => {

    let httpMock: Http;

    beforeAll(() => {
        // @ts-ignore
        mockSignAndBroadcastTransaction();
    });

    afterEach(() => {
        if (httpMock) {
            // @ts-ignore
            httpMock.reset();
        }
    });

    describe('getAlias', () => {
        it('should getAliasById', async () => {
            httpMock = HttpMockBuilder.create().onGetReply(200, {
                    'account': '2402520554221019656',
                    'accountRS': 'TS-QAJA-QW5Y-SWVP-4RVP4',
                    'aliasName': 'superduperalias',
                    'aliasURI': 'Contentchange....',
                    'timestamp': 251224892,
                    'alias': '8468600040485258181',
                    'priceNQT': '500000000',
                    'buyer': '6502115112683865257',
                    'requestProcessingTime': 13
                },
                'relPath?requestType=getAlias&alias=aliasId'
            ).build();
            const service = createChainService(httpMock, 'relPath');
            const asset = await getAliasById(service)('aliasId');
            expect(asset).toEqual({
                'account': '2402520554221019656',
                'accountRS': 'TS-QAJA-QW5Y-SWVP-4RVP4',
                'aliasName': 'superduperalias',
                'aliasURI': 'Contentchange....',
                'timestamp': 251224892,
                'alias': '8468600040485258181',
                'priceNQT': '500000000',
                'buyer': '6502115112683865257',
                'requestProcessingTime': 13
            });
        });
        it('should getAliasesOnSale', async () => {
            httpMock = HttpMockBuilder.create().onGetReply(200, {
                    'aliases': [
                        {
                            'account': '2402520554221019656',
                            'accountRS': 'TS-QAJA-QW5Y-SWVP-4RVP4',
                            'aliasName': 'QAJA',
                            'aliasURI': 'magic',
                            'timestamp': 251228597,
                            'alias': '6442930183499063033',
                            'priceNQT': '1500000000'
                        }
                    ],
                    'requestProcessingTime': 35
                },
                'relPath?requestType=getAliasesOnSale&account=accountId&buyer=buyerId&firstIndex=0&lastIndex=100'
            ).build();
            const service = createChainService(httpMock, 'relPath');
            const asset = await getAliasesOnSale(service)({
                accountId: 'accountId',
                buyerId: 'buyerId',
                firstIndex: 0,
                lastIndex: 100
            });
            expect(asset).toEqual({
                    'aliases': [
                        {
                            'account': '2402520554221019656',
                            'accountRS': 'TS-QAJA-QW5Y-SWVP-4RVP4',
                            'aliasName': 'QAJA',
                            'aliasURI': 'magic',
                            'timestamp': 251228597,
                            'alias': '6442930183499063033',
                            'priceNQT': '1500000000'
                        }
                    ],
                    'requestProcessingTime': 35
                }
            );
        });
        it('should getAliasByName', async () => {
            httpMock = HttpMockBuilder.create().onGetReply(200, {
                    'account': '2402520554221019656',
                    'accountRS': 'TS-QAJA-QW5Y-SWVP-4RVP4',
                    'aliasName': 'superduperalias',
                    'aliasURI': 'Contentchange....',
                    'timestamp': 251224892,
                    'alias': '8468600040485258181',
                    'priceNQT': '500000000',
                    'buyer': '6502115112683865257',
                    'requestProcessingTime': 13
                },
                'relPath?requestType=getAlias&aliasName=aliasName'
            ).build();
            const service = createChainService(httpMock, 'relPath');
            const asset = await getAliasByName(service)('aliasName');
            expect(asset).toEqual({
                'account': '2402520554221019656',
                'accountRS': 'TS-QAJA-QW5Y-SWVP-4RVP4',
                'aliasName': 'superduperalias',
                'aliasURI': 'Contentchange....',
                'timestamp': 251224892,
                'alias': '8468600040485258181',
                'priceNQT': '500000000',
                'buyer': '6502115112683865257',
                'requestProcessingTime': 13
            });
        });
    });

    describe('buyAlias', () => {
        it('should buyAlias', async () => {
            httpMock = HttpMockBuilder.create().onPostReply(200, {'transaction': 'transactionId'},
                'relPath?requestType=buyAlias&aliasName=aliasName&alias=aliasId&deadline=1440&feeNQT=100000&amountNQT=500000000&publicKey=senderPublicKey'
            ).build();
            const service = createChainService(httpMock, 'relPath');
            const asset = await buyAlias(service)({
                feePlanck: '100000',
                amountPlanck: '500000000',
                aliasId: 'aliasId',
                aliasName: 'aliasName',
                senderPublicKey: 'senderPublicKey',
                senderPrivateKey: 'senderPrivateKey'
            });
            expect(asset).toEqual({'transaction': 'transactionId'});
        });
    });
    describe('sellAlias', () => {
        it('should sellAlias', async () => {
            httpMock = HttpMockBuilder.create().onPostReply(200, {'transaction': 'transactionId'},
                'relPath?requestType=sellAlias&aliasName=aliasName&alias=aliasId&deadline=1440&feeNQT=100000&publicKey=senderPublicKey&priceNQT=500000000&recipient=recipientId'
            ).build();
            const service = createChainService(httpMock, 'relPath');
            const asset = await sellAlias(service)({
                feePlanck: '100000',
                amountPlanck: '500000000',
                aliasId: 'aliasId',
                aliasName: 'aliasName',
                senderPublicKey: 'senderPublicKey',
                senderPrivateKey: 'senderPrivateKey',
                recipientId: 'recipientId'
            });
            expect(asset).toEqual({'transaction': 'transactionId'});
        });
    });


    describe('setAlias', () => {
        it('should setAlias using default TLD', async () => {
            httpMock = HttpMockBuilder.create().onPostReply(200, {
                broadcasted: true,
                'transaction': 'transactionId'
                },
                'relPath?requestType=setAlias&aliasName=aliasName&aliasURI=aliasURI&deadline=1440&feeNQT=100000&publicKey=senderPublicKey'
            ).build();
            const service = createChainService(httpMock, 'relPath');
            const asset = await setAlias(service)({
                feePlanck: '100000',
                aliasName: 'aliasName',
                aliasURI: "aliasURI",
                senderPublicKey: 'senderPublicKey',
                senderPrivateKey: 'senderPrivateKey',
            });
            expect(asset).toEqual({'transaction': 'transactionId'});
        });

        it('should setAlias using default TLD - and omit if set explicitely', async () => {
            httpMock = HttpMockBuilder.create().onPostReply(200, {
                broadcasted: true,
                'transaction': 'transactionId'
                },
                'relPath?requestType=setAlias&aliasName=aliasName&aliasURI=aliasURI&deadline=1440&feeNQT=100000&publicKey=senderPublicKey'
            ).build();
            const service = createChainService(httpMock, 'relPath');
            const asset = await setAlias(service)({
                feePlanck: '100000',
                aliasName: 'aliasName',
                aliasURI: "aliasURI",
                tld: "signum",
                senderPublicKey: 'senderPublicKey',
                senderPrivateKey: 'senderPrivateKey',
            });
            expect(asset).toEqual({'transaction': 'transactionId'});
        });
        it('should setAlias using custom TLD', async () => {
            httpMock = HttpMockBuilder.create().onPostReply(200, {
                broadcasted: true,
                'transaction': 'transactionId'
                },
                'relPath?requestType=setAlias&aliasName=aliasName&aliasURI=aliasURI&deadline=1440&feeNQT=100000&publicKey=senderPublicKey&tld=tld'
            ).build();
            const service = createChainService(httpMock, 'relPath');
            const asset = await setAlias(service)({
                feePlanck: '100000',
                aliasName: 'aliasName',
                tld: "tld",
                aliasURI: "aliasURI",
                senderPublicKey: 'senderPublicKey',
                senderPrivateKey: 'senderPrivateKey',
            });
            expect(asset).toEqual({'transaction': 'transactionId'});
        });
    });

    describe('searchAliasesByName', () => {
        it('should search as expected', async () => {
            httpMock = HttpMockBuilder.create().onGetReply(200, {'aliases': []},
                'relPath?requestType=getAliasesByName&aliasName=aliasName&timestamp=10000&firstIndex=0&lastIndex=150'
            ).build();
            const service = createChainService(httpMock, 'relPath');
            const result = await searchAliasesByName(service)({
                aliasName: 'aliasName',
                timestamp: 10000,
                firstIndex: 0,
                lastIndex: 150
            });
            expect(result.aliases).toHaveLength(0);
        });
    });

    describe('getTLDS', () => {
        it('should get as expected', async () => {
            httpMock = HttpMockBuilder.create().onGetReply(200, {'tlds': []},
                'relPath?requestType=getTLDs&timestamp=10000&firstIndex=0&lastIndex=150'
            ).build();
            const service = createChainService(httpMock, 'relPath');
            const result = await getTopLevelDomains(service)({
                timestamp: 10000,
                firstIndex: 0,
                lastIndex: 150
            });
            expect(result.tlds).toHaveLength(0);
        });
    });


    describe('getAliases', () => {
        it('should get without any parameter', async () => {
            httpMock = HttpMockBuilder.create().onGetReply(200, {'aliases': []},
                'relPath?requestType=getAliases'
            ).build();
            const service = createChainService(httpMock, 'relPath');
            const result = await getAliases(service)({});
            expect(result.aliases).toHaveLength(0);
        });
        it('should get without all optional parameter', async () => {
            httpMock = HttpMockBuilder.create().onGetReply(200, {'aliases': []},
                'relPath?requestType=getAliases&account=accountId&tld=tld&aliasName=aliasName&timestamp=10000&firstIndex=0&lastIndex=150'
            ).build();
            const service = createChainService(httpMock, 'relPath');
            const result = await getAliases(service)({
                accountId: 'accountId',
                aliasName: 'aliasName',
                tld: 'tld',
                timestamp: 10000,
                firstIndex: 0,
                lastIndex: 150
            });
            expect(result.aliases).toHaveLength(0);
        });
    });

    describe('buyTopLevelDomain', () => {
        it('should buy as expected', async () => {
            httpMock = HttpMockBuilder.create().onPostReply(200, {
                    broadcasted: true,
                    unsignedTransactionBytes: 'unsignedHexMessage'
                },
                'relPath?requestType=setTLD&message=Some%20message&messageIsText=true&tld=tld&amountNQT=10000000000000&deadline=1440&feeNQT=100000&publicKey=senderPublicKey'
            ).build();
            const service = createChainService(httpMock, 'relPath');
            const result = await buyTopLevelDomain(service)({
                feePlanck: '100000',
                amountPlanck: '10000000000000',
                tld: 'tld',
                attachment: new AttachmentMessage({message: 'Some message', messageIsText: true}),
                deadline: 1440,
                senderPublicKey: 'senderPublicKey'
            });
            expect(result.unsignedTransactionBytes).toBe('unsignedHexMessage');
        });
    });
});
