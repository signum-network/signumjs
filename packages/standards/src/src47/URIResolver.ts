/**
 * Copyright (c) 2022 Signum Network
 */

import {Ledger} from '@signumjs/core';
import {DescriptorData} from '../src44';

// extend this list from time to time...
/**
 * @internal
 * @ignore
 * 
 */
export const KnownTlds = [
    'blockchain',
    'coin',
    'crypto',
    'dao',
    'decentral',
    'dex',
    'free',
    'nft',
    'p2p',
    'signum',
    'signa',
    'sig',
    'sns',
    'w3',
    'wallet',
    'web3',
    'x',
    'y',
    'z',
    'nostr', // bought custom tld
];

/**
 * @ignore
 */
interface URI {
    schema: string;
    subdomain?: string;
    domain: string;
    tld?: string;
    path?: string;
}

/**
 * URI Resolver
 *
 * Resolves SRC47 compliant URIs via Signums Alias system to URLs, or other internal fields
 *
 * ```ts
 * const resolver = new URIResolver(ledger);
 * const resolvedURL = await resolver.resolve("http://arts.johndoe@signum");
 * ```
 *
 * with TLD
 * ```ts
 * const resolver = new URIResolver(ledger);
 * const resolvedURL = await resolver.resolve("https://arts.johndoe@crypto");
 * ```
 *
 * Or get the account Id (if set)
 *
 * ```ts
 * const resolver = new URIResolver(ledger);
 * const accountId = await resolver.resolve("https://arts.johndoe@signum/ac");
 * ```
 *
 * Also considers known top-level domains and accepts the following format for those URIs: <subdomain>.<domain>.<tld> (instead of `@`)
 *
 * 
 */
export class URIResolver {
    constructor(private readonly ledger: Ledger) {
    }

    /**
     * Parses the URI. This method can be used to check SRC47 URI compliance
     * @param uri
     * @return The parsed URI components
     * @throws Error if URI is not compliant
     */
    public static parseURI(uri: string): URI {

        uri = URIResolver.convertKnownTldUri(uri);
        const regex = /^(?<schema>http|https):\/\/(?<body>\$?[\w.]+?)(@(?<tld>\w+)?)?(\/(?<path>[\w-]+)?)?$/gm;
        const result = regex.exec(uri.toLowerCase());

        if (!result?.groups) {
            throw new Error(`Invalid SRC47 URI: ${uri}`);
        }

        const {schema, body, tld = 'signum', path} = result.groups;

        const domains = body.replace('$', '').split('.');

        if (domains.length > 2 || domains.length === 0) {
            throw new Error(`Invalid SRC47 URI: ${uri}`);
        }

        if (domains.length === 2) {
            return {
                domain: domains[1],
                subdomain: domains[0],
                tld,
                schema,
                path
            };
        }

        return {
            domain: domains[0],
            tld,
            schema,
            path
        };
    }

    /**
     * Converts the given URI to a known top-level domain (TLD) format.
     *
     * @param {string} uri - The URI to be converted.
     * @return {string} - The converted URI with a known TLD format.
     */
    public static convertKnownTldUri(uri: string): string {
        uri = uri.toLowerCase();
        const expression = `\\.(${KnownTlds.join('|')})(/[a-zA-Z0-9_-]+)?$`;
        const matches = new RegExp(expression).exec(uri);
        if (matches) {
            return uri.substring(0, matches.index) + '@' + uri.substring(matches.index + 1);
        }
        return uri;
    }

    /**
     * Tries to resolve the URI
     * @param uri A compliant URI
     * @return The URL or internal path, iff exists.
     * @throws Error if
     * - an alias does not exist
     * - alias descriptor is not SRC44 compliant
     * - URI cannot be resolved,
     * - have circular dependencies
     * - maxed out (>100 iterations
     */
    async resolve(uri: string): Promise<string | unknown> {

        const resolvePath = (descriptor: DescriptorData, path: string) => {
            const result = descriptor.getCustomField(path);
            if (!result) {
                throw new Error();
            }
            return result;
        };

        try {

            const visitedAliases = new Set<string>();
            const {tld, domain, subdomain, path = 'hp'} = URIResolver.parseURI(uri);
            let alias = await this.ledger.alias.getAliasByName(domain, tld);
            let descriptor = DescriptorData.parse(alias.aliasURI);

            if (!subdomain) {
                return resolvePath(descriptor, path);
            }
            visitedAliases.add(domain);

            let stopSearch = !descriptor.alias;
            let iterationCount = 0;
            while (!stopSearch) {
                const [aliasName, topleveldomain] = descriptor.alias.split('@');
                alias = await this.ledger.alias.getAliasByName(aliasName, topleveldomain);
                descriptor = DescriptorData.parse(alias.aliasURI);
                if (descriptor.name === subdomain) {
                    return resolvePath(descriptor, path);
                }
                stopSearch = visitedAliases.has(descriptor.alias) || !descriptor.alias || ++iterationCount > 100;
                visitedAliases.add(descriptor.alias);
            }
            throw new Error(); // cannot resolve
            // @ts-ignore
        } catch (e: any) {
            throw new Error(`Could not resolve: ${uri}`);
        }
    }
}
