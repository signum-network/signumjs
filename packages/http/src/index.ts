/**
 * The Http module is a thin, isomorphic wrapper around the platform's native
 * `fetch` API. It unifies responses and errors so that consumers can deal with
 * a single, consistent interface across browsers, Node.js (>=18), Deno, Bun and
 * edge runtimes.
 *
 * @module http
 */

import {Http} from './http';
import {HttpResponse} from './httpResponse';
import {HttpError} from './httpError';
import {HttpMockBuilder} from './httpMockBuilder';
import {HttpClientFactory} from './httpClientFactory';
import {HttpClientOptions} from './httpClientOptions';

export {
    Http,
    HttpClientFactory,
    HttpClientOptions,
    HttpResponse,
    HttpMockBuilder,
    HttpError,
};
