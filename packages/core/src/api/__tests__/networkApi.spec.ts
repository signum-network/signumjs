import {HttpMockBuilder, Http} from '@signumjs/http';
import {getBlockchainStatus} from '../factories/network/getBlockchainStatus';
import {getServerStatus} from '../factories/network/getServerStatus';
import {getTime} from '../factories/network/getTime';
import {createChainService} from '../../__tests__/helpers/createChainService';
import {getMiningInfo, getSuggestedFees} from '../factories/network';
import {FeeQuantPlanck} from '@signumjs/util';

describe('Network Api', () => {

    let httpMock: Http;

    afterEach(() => {
        if (httpMock) {
            // @ts-ignore
            httpMock.reset();
        }
    });

    describe('getBlockchainStatus', () => {
        it('should getBlockchainStatus', async () => {
            httpMock = HttpMockBuilder.create().onGetReply(200, {
                application: 'BRS',
                numberOfBlocks: 100
            }).build();
            const service = createChainService(httpMock, 'relPath');
            const status = await getBlockchainStatus(service)();
            expect(status.application).toBe('BRS');
            expect(status.numberOfBlocks).toBe(100);
            expect(status.lastBlockchainFeederHeight).toBeUndefined(); // not mapped
        });

        it('should fail on getBlockchainStatus', async () => {
            try {
                httpMock = HttpMockBuilder.create().onGetThrowError(500, 'Internal Server Error').build();
                const service = createChainService(httpMock, 'relPath');
                await getBlockchainStatus(service)();
                expect(true).toBe('Exception expected');
            } catch (error) {
                expect(error.status).toBe(500);
            }
        });
    });

    describe('getMiningInfo', () => {
        it('should getMiningInfo', async () => {

            httpMock = HttpMockBuilder.create().onGetReply(200, {
                height: 100,
                lastBlockReward: '110'
            }).build();
            const service = createChainService(httpMock, 'relPath');
            const miningInfo = await getMiningInfo(service)();
            expect(miningInfo.height).toBe(100);
            expect(miningInfo.lastBlockReward).toBe('110');
        });
    });

    describe('getServerStatus', () => {
        it('should getServerStatus', async () => {

            httpMock = HttpMockBuilder.create().onGetReply(200, {
                application: 'BRS',
                numberOfPeers: 100,
                numberOfAccounts: 10,
            }).build();
            const service = createChainService(httpMock, 'relPath');
            const status = await getServerStatus(service)();
            expect(status.application).toBe('BRS');
            expect(status.numberOfAccounts).toBe(10);
            expect(status.numberOfPeers).toBe(100);
            expect(status.numberOfAskOrders).toBeUndefined(); // not mapped
        });

        it('should fail on getServerStatus', async () => {
            try {
                httpMock = HttpMockBuilder.create().onGetThrowError(500, 'Internal Server Error').build();
                const service = createChainService(httpMock, 'relPath');
                await getServerStatus(service)();
                expect(true).toBe('Exception expected');
            } catch (error) {
                expect(error.status).toBe(500);
            }
        });
    });

    describe('getTime', () => {
        it('should getTime', async () => {

            httpMock = HttpMockBuilder.create().onGetReply(200, {
                time: 100000000,
            }).build();
            const service = createChainService(httpMock, 'relPath');
            const status = await getTime(service)();
            expect(status.time).toBe(100000000);
        });
    });


    describe('suggestFee', () => {
        it('should get suggested fees with minimum fee', async () => {
            httpMock = HttpMockBuilder.create().onGetReply(200, {
                standard: 1,
                cheap: 2,
                priority: 3,
                requestProcessingTime: 100
            }).build();
            const service = createChainService(httpMock, 'relPath');
            const status = await getSuggestedFees(service)();
            expect(status).toEqual({
                minimum: FeeQuantPlanck,
                standard: 1,
                cheap: 2,
                priority: 3,
                requestProcessingTime: 100
            });
        });
    });
});
