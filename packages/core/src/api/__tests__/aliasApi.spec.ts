/* tslint:disable:quotemark */
import {HttpMockBuilder, Http} from '@signumjs/http';
import {
    getAliasById,
    getAliasesOnSale,
    buyAlias,
    sellAlias,
    getAliasByName
} from '../factories';
import {mockSignAndBroadcastTransaction, createChainService} from '../../__tests__/helpers';

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
                'relPath?requestType=getAliasesOnSale&firstIndex=0&lastIndex=100'
            ).build();
            const service = createChainService(httpMock, 'relPath');
            const asset = await getAliasesOnSale(service)(0, 100);
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
                'relPath?requestType=buyAlias&aliasName=aliasName&aliasId=aliasId&deadline=1440&feeNQT=100000&amountNQT=500000000&publicKey=senderPublicKey'
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
});
