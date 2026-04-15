/**
 * Options for the fetch-based Http client.
 *
 * These are forwarded to every request made by the client, and can be
 * overridden on a per-call basis by passing the same shape as the second
 * (or third, for post/put) argument.
 *
 * @module http
 */
export interface HttpClientOptions {
    /**
     * Extra headers sent with each request.
     */
    headers?: Record<string, string>;

    /**
     * Request timeout in milliseconds. Uses AbortSignal.timeout under the hood.
     */
    timeout?: number;

    /**
     * Predicate to decide which HTTP status codes resolve and which reject.
     * Defaults to `status >= 200 && status < 300`.
     */
    validateStatus?: (status: number) => boolean;

    /**
     * Additional RequestInit fields forwarded to fetch (e.g. credentials, mode, cache).
     * Ignored: method, body, headers, signal — those are managed by the adapter.
     */
    fetchOptions?: Omit<RequestInit, 'method' | 'body' | 'headers' | 'signal'>;
}