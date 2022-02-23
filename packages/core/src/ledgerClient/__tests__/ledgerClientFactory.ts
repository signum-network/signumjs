import {LedgerClientFactory} from '../ledgerClientFactory';
import {ApiSettings, composeApi} from '../../api';
import {Http, HttpResponse} from '@signumjs/http';


class TestHttpAdapter implements Http {
    delete(url: string, options?: any): Promise<HttpResponse> {
        return Promise.resolve(new HttpResponse(200, 'test'));
    }

    get(url: string, options?: any): Promise<HttpResponse> {
        return Promise.resolve(new HttpResponse(200, 'test'));
    }

    post(url: string, payload: any, options?: any): Promise<HttpResponse> {
        return Promise.resolve(new HttpResponse(200, 'test'));
    }

    put(url: string, payload: any, options?: any): Promise<HttpResponse> {
        return Promise.resolve(new HttpResponse(200, 'test'));
    }
}


describe('LedgerClientFactory', () => {

    it('should create the ledger client', async () => {
        const ledger = LedgerClientFactory.createClient({
            nodeHost: 'nodehost',
            reliableNodeHosts: ['node1', 'node2']
        });

        expect(ledger.block).toBeDefined();
        expect(ledger.account).toBeDefined();
        expect(ledger.transaction).toBeDefined();
        expect(ledger.service.settings.httpClient).toBeDefined();
        expect(ledger.service.settings.apiRootUrl).toBe('/burst');
        expect(ledger.service.settings.nodeHost).toBe('nodehost');
        expect(ledger.service.settings.reliableNodeHosts).toEqual(['node1', 'node2']);

    });

    it('should work with a custom http adapter', async () => {
        const httpAdapter = new TestHttpAdapter();
        const spied = jest.spyOn(httpAdapter, 'get');
        const ledger = LedgerClientFactory.createClient({
            nodeHost: 'nodeHost',
            httpClient: httpAdapter
        });
        const response = await ledger.network.getNetworkInfo();
        expect(response).toBe('test');
        expect(spied).toBeCalledWith('/burst?requestType=getConstants', undefined);
    });

});
