import {Http} from './http';
import {HttpAdapterFetch} from './httpAdapterFetch';
import {HttpClientOptions} from './httpClientOptions';

/**
 * Factory for clients of {@link Http}
 *
 * @module http
 */
export class HttpClientFactory {
    /**
     * Creates an Http instance backed by the platform's native `fetch`.
     *
     * Works in browsers, Node.js >= 18, Deno, Bun and Cloudflare Workers.
     *
     * @param baseUrl The base/root host url for the adapter, i.e. https://contoso.com
     * @param options Optional {@link HttpClientOptions} applied to every request.
     */
    static createHttpClient(baseUrl: string, options?: HttpClientOptions): Http {
        return new HttpAdapterFetch(baseUrl, options);
    }
}
