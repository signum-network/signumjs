import {ApiSettings, composeApi} from '../composeApi';
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

describe('composeApi', () => {

    it('should compose with no errors', async () => {
        const api = composeApi(new ApiSettings(
            'nodeHost',
            [],
            {
                headers: {
                    'X-Test': 'some test'
                }
            }
        ));

        expect(api.asset).toBeDefined();
        expect(api.account).toBeDefined();
        expect(api.alias).toBeDefined();
        expect(api.block).toBeDefined();
        expect(api.contract).toBeDefined();
        expect(api.message).toBeDefined();
        expect(api.network).toBeDefined();
        expect(api.transaction).toBeDefined();
    });

    it('should work with a custom http adapter', async () => {
        const httpAdapter = new TestHttpAdapter();
        const spied = jest.spyOn(httpAdapter, 'get');
        const api = composeApi(new ApiSettings(
            'nodeHost',
            [],
            {},
            httpAdapter
        ));
        const response = await api.network.getNetworkInfo();
        expect(response).toBe('test');
        expect(spied).toBeCalledWith('/api?requestType=getConstants', undefined);
    });

});
