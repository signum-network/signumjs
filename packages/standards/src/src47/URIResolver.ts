import {Ledger} from '@signumjs/core';

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

interface URI {
    schema: 'http' | 'https' | 'signum';
    subdomain?: string;
    domain: string;
    tld?: string;
}

const assertTLD = (tld: string) => {
    if (AllowedTLDs.indexOf(tld) === -1) {
        throw new Error(`Invalid SRC47 URI - Unsupported TLD: ${tld}`);
    }
};

/**
 *
 */
export class URIResolver {
    constructor(private ledger: Ledger) {
    }

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

    public assertValidURI(uri: string) {
        const parsed = this.parseURI(uri);
    }

    async resolve(uri: string): Promise<URL> {

        return new URL('http://ohager.com');
    }
}
