/* tslint:disable:quotemark */
import {HttpMockBuilder, Http} from '@signumjs/http';
import {getBlockchainStatus} from '../factories/network/getBlockchainStatus';
import {getAsset} from '../factories/asset/getAsset';
import {
    getAliases,
    getAliasById,
    setAlias,
    getAliasesOnSale,
    buyAlias,
    sellAlias,
    getAliasByName
} from '../factories';
import {Amount, FeeQuantPlanck} from '@signumjs/util';
import {mockSignAndBroadcastTransaction, createChainService} from '../../__tests__/helpers';
import {TransactionId} from '../../typings/transactionId';

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
                "account": "2402520554221019656",
                "accountRS": "TS-QAJA-QW5Y-SWVP-4RVP4",
                "aliasName": "superduperalias",
                "aliasURI": "Contentchange....",
                "timestamp": 251224892,
                "alias": "8468600040485258181",
                "priceNQT": "500000000",
                "buyer": "6502115112683865257",
                "requestProcessingTime": 13
            },
                "relPath?requestType=getAlias&alias=aliasId"
                ).build();
            const service = createChainService(httpMock, 'relPath');
            const asset = await getAliasById(service)('aliasId');
            expect(asset).toEqual({
                "account": "2402520554221019656",
                "accountRS": "TS-QAJA-QW5Y-SWVP-4RVP4",
                "aliasName": "superduperalias",
                "aliasURI": "Contentchange....",
                "timestamp": 251224892,
                "alias": "8468600040485258181",
                "priceNQT": "500000000",
                "buyer": "6502115112683865257",
                "requestProcessingTime": 13
            });
        });
        it('should getAliasByName', async () => {
            httpMock = HttpMockBuilder.create().onGetReply(200, {
                "account": "2402520554221019656",
                "accountRS": "TS-QAJA-QW5Y-SWVP-4RVP4",
                "aliasName": "superduperalias",
                "aliasURI": "Contentchange....",
                "timestamp": 251224892,
                "alias": "8468600040485258181",
                "priceNQT": "500000000",
                "buyer": "6502115112683865257",
                "requestProcessingTime": 13
            },
                "relPath?requestType=getAlias&aliasName=aliasName"
                ).build();
            const service = createChainService(httpMock, 'relPath');
            const asset = await getAliasByName(service)('aliasName');
            expect(asset).toEqual({
                "account": "2402520554221019656",
                "accountRS": "TS-QAJA-QW5Y-SWVP-4RVP4",
                "aliasName": "superduperalias",
                "aliasURI": "Contentchange....",
                "timestamp": 251224892,
                "alias": "8468600040485258181",
                "priceNQT": "500000000",
                "buyer": "6502115112683865257",
                "requestProcessingTime": 13
            });
        });
    });
});
