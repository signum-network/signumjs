/**
 * Copyright (c) 2022 Signum Network
 */

import {Ledger} from '@signumjs/core';
import {DescriptorData, DescriptorDataClient} from '../src44';

/**
 * @ignore
 */
const AllowedTLDs = [
    'signum',
    'signa',
    'sig',
    'sns',
    'free',
    'web3',
    'crypto',
    'p2p',
    'wallet',
    'blockhain',
    'dex',
    'decentral',
    'x',
    'y',
    'z'];

/**
 * @ignore
 */
interface URI {
    schema: 'http' | 'https' | 'signum';
    subdomain?: string;
    domain: string;
    tld?: string;
}

/**
 * @ignore
 */
const assertTLD = (tld: string) => {
    if (AllowedTLDs.indexOf(tld) === -1) {
        throw new Error(`Invalid SRC47 URI - Unsupported TLD: ${tld}`);
    }
};

/**
 * URI Resolver
 *
 * Resolves SRC47 compliant URIs via Signums Alias system to URLs
 *
 * ```ts
 * const resolver = new URIResolver(ledger);
 * const resolvedURL = await resolver.resolve("http://arts.johndoe");
 * ```
 *
 * @module standards.SRC47
 */
export class URIResolver {
    constructor(private ledger: Ledger) {
    }

    /**
     * Parses the URI
     * @param uri
     * @return The parsed URI components
     * @throws Error if URI is not compliant
     */
    public parseURI(uri: string): URI {
        const regex = /^(?<schema>http|https|signum):\/\/(?<body>\$?[\w.]+?)(\.(?<tld>\w+)?)?$/gm;
        const result = regex.exec(uri.toLowerCase());

        // @ts-ignore
        if (!result || !result.groups) {
            throw new Error(`Invalid SRC47 URI: ${uri}`);
        }

        // @ts-ignore
        const {schema, body, tld} = result.groups;

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
                } :
                {
                    domain: domains[0],
                    schema,
                };
        }
        if (schema === 'signum' && tld) {
            return {
                domain: tld,
                subdomain: domains[0],
                schema,
            };
        }

        if (tld) {
            assertTLD(tld);
        }

        if (domains.length === 2) {
            return {
                domain: domains[1],
                subdomain: domains[0],
                tld,
                schema
            };
        }

        return {
            domain: domains[0],
            tld,
            schema,
        };
    }

    /**
     * Tries to resolve the URI
     * @param uri A compliant URI
     * @return The URL, iff exists, otherwise empty string;
     * @throws Error if an alias does not exist, or alias descriptor is not SRC44 compliant.
     */
    async resolve(uri: string): Promise<string> {
        try {

            const visitedAliases = new Set<string>();
            const {domain, subdomain} = this.parseURI(uri);
            let alias = await this.ledger.alias.getAliasByName(domain);
            let descriptor = DescriptorData.parse(alias.aliasURI);

            if (!subdomain) {
                return descriptor.homePage;
            }
            visitedAliases.add(domain);

            let stopSearch = !descriptor.alias;
            while (!stopSearch) {
                alias = await this.ledger.alias.getAliasByName(descriptor.alias);
                descriptor = DescriptorData.parse(alias.aliasURI);
                if (descriptor.name === subdomain) {
                    return descriptor.homePage;
                }
                stopSearch = visitedAliases.has(descriptor.alias) || !descriptor.alias;
                visitedAliases.add(descriptor.alias);
            }
            throw new Error(); // cannot resolve
        // @ts-ignore
        } catch (e: any) {
            throw new Error(`Could not resolve: ${uri}`);
        }
    }
}
