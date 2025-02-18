import {vi, it, describe, expect, afterEach} from 'vitest';
import {ChainService} from '../chainService';
import {HttpError, HttpMockBuilder, HttpResponse, Http} from '@signumjs/http';
import {ChainServiceSettings} from '../chainServiceSettings';
import {DefaultApiEndpoint} from '../../constants';
import {createChainService} from '../../__tests__/helpers';
import {verifyTransaction} from '../../internal/verifyTransaction';
vi.mock('../../internal/verifyTransaction', () => {
    return {
        verifyTransaction: vi.fn()
    };
});



class TestHttpClient implements Http {
    delete(url: string): Promise<HttpResponse> {
        return undefined;
    }

    get(url: string): Promise<HttpResponse> {
        return Promise.resolve(null);
    }

    post(url: string, payload: any): Promise<HttpResponse> {
        return undefined;
    }

    put(url: string, payload: any): Promise<HttpResponse> {
        return undefined;
    }

}

describe('ChainService', () => {
    describe('constructor', () => {
        it('should create with least required parameters', () => {
            const {settings} = new ChainService({
                nodeHost: 'nodeHost',
            });
            expect(settings.nodeHost).toBe('nodeHost');
            expect(settings.apiRootUrl).toBe(DefaultApiEndpoint);
            expect(settings.reliableNodeHosts).toEqual([]);
            expect(settings.httpClient instanceof TestHttpClient).toBeFalsy();
        });

        it('should create with other HttpClient', () => {
            const {settings} = new ChainService({
                nodeHost: 'nodeHost',
                apiRootUrl: 'apiRootUrl',
                reliableNodeHosts: ['trustedHost1', 'trustedHost2', 'trustedHost3'],
                httpClient: new TestHttpClient()
            });
            expect(settings.nodeHost).toBe('nodeHost');
            expect(settings.apiRootUrl).toBe('apiRootUrl');
            expect(settings.reliableNodeHosts).toEqual(['trustedHost1', 'trustedHost2', 'trustedHost3']);
            expect(settings.httpClient instanceof TestHttpClient).toBeTruthy();
        });
    });

    describe('toApiEndpoint() relative Path', () => {

        const settings: ChainServiceSettings = {
            nodeHost: 'localhost',
        };

        let service = new ChainService(settings);

        it('should create Signum API url without any parameter', () => {
            const url = service.toApiEndpoint('getBlockByHeight');
            expect(url).toBe('/api?requestType=getBlockByHeight');
        });

        it('should create Signum API url with one parameter', () => {
            const url = service.toApiEndpoint('getBlockByHeight', {id: 123});
            expect(url).toBe('/api?requestType=getBlockByHeight&id=123');
        });

        it('should create Signum API url with many parameters', () => {
            const url = service.toApiEndpoint('getBlockByHeight', {id: 123, includeTransactions: true});
            expect(url).toBe('/api?requestType=getBlockByHeight&id=123&includeTransactions=true');
        });

        it('should create Signum API url with many parameters and encode correctly', () => {
            const url = service.toApiEndpoint('getBlockByHeight', {
                id: 123,
                includeTransactions: true,
                data: '{"foo":"some data#&$%-";\n\t"bar":"1234"}'
            });
            expect(url).toBe('/api?requestType=getBlockByHeight&id=123&includeTransactions=true&data=%7B%22foo%22%3A%22some%20data%23%26%24%25-%22%3B%0A%09%22bar%22%3A%221234%22%7D');
        });

        it('should create Signum API url with many parameters ignoring undefined', () => {
            const url = service.toApiEndpoint('getBlockByHeight',
                {
                    id: 123,
                    includeTransactions: true,
                    foo: undefined,
                    bar: undefined
                });
            expect(url).toBe('/api?requestType=getBlockByHeight&id=123&includeTransactions=true');
        });

        it('should create Signum API url with many parameters and relative Url', () => {
            service = new ChainService({
                    nodeHost: 'localhost',
                    apiRootUrl: '/api/' // chopps trailing slash
                }
            );
            const url = service.toApiEndpoint('getBlockByHeight', {id: 123, includeTransactions: true});
            expect(url).toBe('/api?requestType=getBlockByHeight&id=123&includeTransactions=true');
        });


        it('should create Signum API url with many parameters ignoring "skipAdditionalSecurityCheck" ', () => {
            service = new ChainService({
                    nodeHost: 'localhost',
                    apiRootUrl: '/api/' // chopps trailing slash
                }
            );
            const url = service.toApiEndpoint('getBlockByHeight', {id: 123, includeTransactions: true, skipAdditionalSecurityCheck: true});
            expect(url).toBe('/api?requestType=getBlockByHeight&id=123&includeTransactions=true');
        });

    });


    describe('send()', () => {

        afterEach(() => {
            vi.clearAllMocks();
        })

        it('should successfully send data', async () => {
            const httpMock = HttpMockBuilder.create().onPostReply(200, {
                foo: 'someData'
            }).build();
            const service = createChainService(httpMock);
            const result = await service.send('someMethod');

            expect(result).toEqual({foo: 'someData'});
            expect(verifyTransaction).toBeCalled();
        });
        it('should successfully send data and skip verifyTransaction', async () => {
            const httpMock = HttpMockBuilder.create().onPostReply(200, {
                foo: 'someData',

            }).build();
            const service = createChainService(httpMock);
            const result = await service.send('someMethod', {skipAdditionalSecurityCheck: true});

            expect(result).toEqual({foo: 'someData'});
            expect(verifyTransaction).not.toBeCalled();
        });

        it('should throw normal Http error', async () => {
            const httpMock = HttpMockBuilder.create().onPostThrowError(
                500,
                'error',
                {data: 'any'}
            ).build();

            try {
                const service = createChainService(httpMock);
                await service.send('someMethod');
                expect('Expected exception').toBeFalsy();
            } catch (e) {
                const httpError = <HttpError>e;
                expect(httpError.status).toBe(500);
                expect(httpError.message).toBe('error');
                expect(httpError.data).toEqual({data: 'any'});
            }
        });


        it('should throw Http error due to BRS API error', async () => {
            const httpMock = HttpMockBuilder.create().onPostReply(
                200,
                {errorCode: 123, errorDescription: 'BRS API Error'}
            ).build();

            try {
                const service = createChainService(httpMock);
                await service.send('someMethod');
                expect('Expected exception').toBeFalsy();
            } catch (e) {
                const httpError = <HttpError>e;
                expect(httpError.status).toBe(400);
                expect(httpError.message).toContain('BRS API Error');
                expect(httpError.message).toContain('123');
                expect(httpError.data).toEqual({errorCode: 123, errorDescription: 'BRS API Error'});
            }
        });
    });

    describe('query()', () => {
        it('should successfully query data', async () => {
            const httpMock = HttpMockBuilder.create().onGetReply(200, {
                foo: 'someData'
            }).build();
            const service = createChainService(httpMock);
            const result = await service.query('someMethod');

            expect(result).toEqual({foo: 'someData'});

        });

        it('should call successfully query data', async () => {
            const httpMock = HttpMockBuilder.create().onGetReply(200, {
                foo: 'someData'
            }).build();
            const service = createChainService(httpMock);
            const result = await service.query('someMethod');

            expect(result).toEqual({foo: 'someData'});

        });

        it('should throw normal Http error', async () => {
            const httpMock = HttpMockBuilder.create().onGetThrowError(
                500,
                'error',
                {data: 'any'}
            ).build();

            try {
                const service = createChainService(httpMock);
                await service.query('someMethod');
                expect('Expected exception').toBeFalsy();
            } catch (e) {
                const httpError = <HttpError>e;
                expect(httpError.status).toBe(500);
                expect(httpError.message).toBe('error');
                expect(httpError.data).toEqual({data: 'any'});
            }
        });


        it('should throw Http error due to BRS API error', async () => {
            const httpMock = HttpMockBuilder.create().onGetReply(
                200,
                {errorCode: 123, errorDescription: 'BRS API Error'}
            ).build();

            try {
                const service = createChainService(httpMock);
                await service.query('someMethod');
                expect('Expected exception').toBeFalsy();
            } catch (e) {
                const httpError = <HttpError>e;
                expect(httpError.status).toBe(400);
                expect(httpError.message).toContain('BRS API Error');
                expect(httpError.message).toContain('123');
                expect(httpError.data).toEqual({errorCode: 123, errorDescription: 'BRS API Error'});
            }
        });
    });


    describe('selectBestHost()', () => {
        it('should return some host', async () => {

            const testClient = new TestHttpClient();
            testClient.get = vi.fn().mockResolvedValue('get');

            const service = new ChainService({
                nodeHost: 'nodeHost',
                apiRootUrl: 'apiRootUrl',
                reliableNodeHosts: ['trustedHost1', 'trustedHost2', 'trustedHost3'],
                httpClient: testClient
            });

            const bestHost = await service.selectBestHost();
            expect(bestHost).toContain('trustedHost');
            expect(service.settings.nodeHost).not.toContain('trustedHost');
            expect(service.settings.httpClient).toBe(testClient);
        });

        it('should reconfigure the host', async () => {

            const testClient = new TestHttpClient();
            testClient.get = vi.fn().mockResolvedValue('get');

            const service = new ChainService({
                nodeHost: 'nodeHost',
                apiRootUrl: 'apiRootUrl',
                reliableNodeHosts: ['trustedHost1', 'trustedHost2', 'trustedHost3'],
                httpClient: testClient
            });

            const bestHost = await service.selectBestHost(true);
            expect(bestHost).toContain('trustedHost');
            expect(service.settings.nodeHost).toContain('trustedHost');
            expect(service.settings.httpClient).not.toBe(testClient);
        });

        it('should throw error if not enough trustedHosts are set', async () => {
            const service = new ChainService({
                nodeHost: 'nodeHost',
                apiRootUrl: 'apiRootUrl',
                httpClient: new TestHttpClient()
            });

            try {
                await service.selectBestHost();
                expect('Expected exception').toBeFalsy();
            } catch (e:any) {
                expect(e.message).toBe('No reliable node hosts configured');
            }
        });
    });
});
