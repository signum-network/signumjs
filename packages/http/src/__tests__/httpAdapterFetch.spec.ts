import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {HttpAdapterFetch} from '../httpAdapterFetch';
import {HttpError} from '../httpError';

type FetchArgs = Parameters<typeof fetch>;

function jsonResponse(status: number, body: any, statusText = ''): Response {
    return new Response(JSON.stringify(body), {
        status,
        statusText,
        headers: {'content-type': 'application/json'}
    });
}

describe('HttpAdapterFetch', () => {

    const originalFetch = globalThis.fetch;
    let fetchMock: ReturnType<typeof vi.fn>;

    beforeEach(() => {
        fetchMock = vi.fn();
        globalThis.fetch = fetchMock as unknown as typeof fetch;
    });

    afterEach(() => {
        globalThis.fetch = originalFetch;
        vi.restoreAllMocks();
    });

    describe('URL handling', () => {

        it('joins baseURL and relative path with a single slash', async () => {
            fetchMock.mockResolvedValueOnce(jsonResponse(200, {ok: true}));
            const http = new HttpAdapterFetch('https://api.example.com');

            await http.get('/users');

            const [url] = fetchMock.mock.calls[0] as FetchArgs;
            expect(url).toBe('https://api.example.com/users');
        });

        it('normalizes trailing slashes on baseURL and missing leading slash on path', async () => {
            fetchMock.mockResolvedValueOnce(jsonResponse(200, {}));
            const http = new HttpAdapterFetch('https://api.example.com///');

            await http.get('users/42');

            const [url] = fetchMock.mock.calls[0] as FetchArgs;
            expect(url).toBe('https://api.example.com/users/42');
        });

        it('passes absolute urls through unchanged', async () => {
            fetchMock.mockResolvedValueOnce(jsonResponse(200, {}));
            const http = new HttpAdapterFetch('https://api.example.com');

            await http.get('https://other.example.com/ping');

            const [url] = fetchMock.mock.calls[0] as FetchArgs;
            expect(url).toBe('https://other.example.com/ping');
        });
    });

    describe('methods and payload', () => {

        it('sends GET without a body', async () => {
            fetchMock.mockResolvedValueOnce(jsonResponse(200, {a: 1}));
            const http = new HttpAdapterFetch('https://api.example.com');

            const response = await http.get('/a');

            const [, init] = fetchMock.mock.calls[0] as FetchArgs;
            expect(init?.method).toBe('GET');
            expect(init?.body).toBeUndefined();
            expect(response.status).toBe(200);
            expect(response.response).toEqual({a: 1});
        });

        it('serializes POST payload as JSON with content-type', async () => {
            fetchMock.mockResolvedValueOnce(jsonResponse(201, {id: 1}));
            const http = new HttpAdapterFetch('https://api.example.com');

            await http.post('/users', {name: 'alice'});

            const [, init] = fetchMock.mock.calls[0] as FetchArgs;
            expect(init?.method).toBe('POST');
            expect(init?.body).toBe(JSON.stringify({name: 'alice'}));
            const headers = init?.headers as Record<string, string>;
            expect(headers['Content-Type']).toBe('application/json');
            expect(headers['Accept']).toBe('application/json');
        });

        it('passes string payloads through as-is without overriding content-type', async () => {
            fetchMock.mockResolvedValueOnce(jsonResponse(200, {}));
            const http = new HttpAdapterFetch('https://api.example.com');

            await http.post('/raw', 'plain', {headers: {'Content-Type': 'text/plain'}});

            const [, init] = fetchMock.mock.calls[0] as FetchArgs;
            expect(init?.body).toBe('plain');
            const headers = init?.headers as Record<string, string>;
            expect(headers['Content-Type']).toBe('text/plain');
        });

        it('sends PUT and DELETE with the right methods', async () => {
            fetchMock.mockResolvedValueOnce(jsonResponse(200, {}));
            fetchMock.mockResolvedValueOnce(new Response(null, {status: 204}));
            const http = new HttpAdapterFetch('https://api.example.com');

            await http.put('/users/1', {name: 'bob'});
            await http.delete('/users/1');

            expect((fetchMock.mock.calls[0] as FetchArgs)[1]?.method).toBe('PUT');
            expect((fetchMock.mock.calls[1] as FetchArgs)[1]?.method).toBe('DELETE');
        });
    });

    describe('errors', () => {

        it('throws HttpError with status and parsed body on non-2xx', async () => {
            fetchMock.mockResolvedValueOnce(jsonResponse(404, {error: 'nope'}, 'Not Found'));
            const http = new HttpAdapterFetch('https://api.example.com');

            await expect(http.get('/missing')).rejects.toMatchObject({
                status: 404,
                message: 'Not Found',
                data: {error: 'nope'},
                requestUrl: '/missing'
            });
        });

        it('throws HttpError when fetch itself rejects (network error)', async () => {
            fetchMock.mockRejectedValueOnce(new TypeError('network down'));
            const http = new HttpAdapterFetch('https://api.example.com');

            try {
                await http.get('/x');
                throw new Error('expected HttpError');
            } catch (e: any) {
                expect(e).toBeInstanceOf(HttpError);
                expect(e.status).toBe(0);
                expect(e.message).toBe('Request failed');
            }
        });

        it('reports timeouts distinctly', async () => {
            const abortErr = new Error('timeout');
            abortErr.name = 'TimeoutError';
            fetchMock.mockRejectedValueOnce(abortErr);
            const http = new HttpAdapterFetch('https://api.example.com');

            await expect(http.get('/slow', {timeout: 10})).rejects.toMatchObject({
                status: 0,
                message: 'Request timed out'
            });
        });
    });

    describe('validateStatus', () => {

        it('defaults to 2xx as success', async () => {
            fetchMock.mockResolvedValueOnce(jsonResponse(299, {}));
            const http = new HttpAdapterFetch('https://api.example.com');

            const response = await http.get('/a');
            expect(response.status).toBe(299);
        });

        it('uses a custom predicate from the constructor options', async () => {
            fetchMock.mockResolvedValueOnce(jsonResponse(418, {tea: true}));
            const validateStatus = vi.fn(() => true);

            const http = new HttpAdapterFetch('https://api.example.com', {validateStatus});
            const response = await http.get('/teapot');

            expect(validateStatus).toHaveBeenCalledWith(418);
            expect(response.status).toBe(418);
        });

        it('per-call options override defaults', async () => {
            fetchMock.mockResolvedValueOnce(jsonResponse(500, {}));

            const http = new HttpAdapterFetch('https://api.example.com');
            const response = await http.get('/a', {validateStatus: (s) => s === 500});
            expect(response.status).toBe(500);
        });
    });

    describe('headers', () => {

        it('merges default and per-call headers with per-call winning', async () => {
            fetchMock.mockResolvedValueOnce(jsonResponse(200, {}));
            const http = new HttpAdapterFetch('https://api.example.com', {
                headers: {'X-Trace': 'base', 'X-Keep': 'yes'}
            });

            await http.get('/a', {headers: {'X-Trace': 'override'}});

            const [, init] = fetchMock.mock.calls[0] as FetchArgs;
            const headers = init?.headers as Record<string, string>;
            expect(headers['X-Trace']).toBe('override');
            expect(headers['X-Keep']).toBe('yes');
        });
    });

    describe('body parsing', () => {

        it('returns null for 204 No Content', async () => {
            fetchMock.mockResolvedValueOnce(new Response(null, {status: 204}));
            const http = new HttpAdapterFetch('https://api.example.com');

            const response = await http.delete('/a');
            expect(response.status).toBe(204);
            expect(response.response).toBeNull();
        });

        it('returns text body when content-type is not json', async () => {
            fetchMock.mockResolvedValueOnce(new Response('hello', {
                status: 200,
                headers: {'content-type': 'text/plain'}
            }));
            const http = new HttpAdapterFetch('https://api.example.com');

            const response = await http.get('/a');
            expect(response.response).toBe('hello');
        });
    });
});
