/**
 * Copyright (c) 2022 Signum Network
 */

import {Ledger} from '@signumjs/core';
import {DescriptorData} from '../src44';

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
 * Resolves SRC47 compliant URIs via Signums Alias system to URLs
 *
 * ```ts
 * const resolver = new URIResolver(ledger);
 * const resolvedURL = await resolver.resolve("signum://arts.johndoe");
 * ```
 *
 * Or get the account Id (if set)
 *
 * ```ts
 * const resolver = new URIResolver(ledger);
 * const accountId = await resolver.resolve("signum://arts.johndoe/ac");
 * ```
 * @module standards.SRC47
 */
export class URIResolver {
    constructor(private ledger: Ledger) {
    }

    /**
     * Parses the URI. This method can be used to check URI compliance
     * @param uri
     * @return The parsed URI components
     * @throws Error if URI is not compliant
     */
    public static parseURI(uri: string): URI {
        const regex = /^(?<schema>http|https|signum):\/\/(?<body>\$?[\w.]+?)(\.(?<tld>\w+)?)?(\/(?<path>[\w-]+)?)?$/gm;
        const result = regex.exec(uri.toLowerCase());

        // @ts-ignore
        if (!result || !result.groups) {
            throw new Error(`Invalid SRC47 URI: ${uri}`);
        }

        // @ts-ignore
        const {schema, body, tld, path} = result.groups;

        const isShortcut = body.startsWith('$');
        const domains = body.replace('$', '').split('.');

        if (domains.length > 2 || domains.length === 0) {
            throw new Error(`Invalid SRC47 URI: ${uri}`);
        }

        if (isShortcut) {
            return tld ? {
                    domain: tld,
                    subdomain: domains[0],
                    schema,
                    path
                } :
                {
                    domain: domains[0],
                    schema,
                    path
                };
        }
        if (schema === 'signum' && tld) {
            return {
                domain: tld,
                subdomain: domains[0],
                schema,
                path
            };
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
                alias = await this.ledger.alias.getAliasByName(descriptor.alias);
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
