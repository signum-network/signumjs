import {URIResolver} from '../URIResolver';

export const MockLedger = (aliasDescriptor: object) => ({
    alias: {
        getAliasByName: () => Promise.resolve(aliasDescriptor)
    }
});

describe('URIResolver', () => {
    describe('resolve', () => {
            it('should resolve by signum:// scheme', () => {

            });
            it('should resolve by shortcut \"$\"', () => {

            });
            it('should resolve by TLDs', () => {

            });
        }
    );
    describe('parseURI', () => {
            it('should resolve by signum:// scheme', () => {
                // @ts-ignore
                const resolver = new URIResolver(MockLedger);
                expect(resolver.parseURI('signum://johndoe')).toEqual({
                    schema: 'signum',
                    domain: 'johndoe'
                });
                expect(resolver.parseURI('signum://sub.johndoe')).toEqual({
                    schema: 'signum',
                    domain: 'johndoe',
                    subdomain: 'sub'
                });
            });
            it('should resolve by shortcut \"$\"', () => {
                // @ts-ignore
                const resolver = new URIResolver(MockLedger);
                expect(resolver.parseURI('http://$johndoe')).toEqual({
                    schema: 'http',
                    domain: 'johndoe'
                });
                expect(resolver.parseURI('https://$johndoe')).toEqual({
                    schema: 'https',
                    domain: 'johndoe'
                });
                // for robustness
                expect(resolver.parseURI('signum://$johndoe')).toEqual({
                    schema: 'signum',
                    domain: 'johndoe'
                });
                expect(resolver.parseURI('http://$sub.johndoe')).toEqual({
                    schema: 'http',
                    domain: 'johndoe',
                    subdomain: 'sub'
                });
                expect(resolver.parseURI('https://$sub.johndoe')).toEqual({
                    schema: 'https',
                    domain: 'johndoe',
                    subdomain: 'sub'
                });
            });
            it('should resolve by TLDs', () => {
                // @ts-ignore
                const resolver = new URIResolver(MockLedger);
                expect(resolver.parseURI('http://johndoe.signum')).toEqual({
                    schema: 'http',
                    domain: 'johndoe',
                    tld: 'signum',
                });
                expect(resolver.parseURI('http://sub.johndoe.signum')).toEqual({
                    schema: 'http',
                    domain: 'johndoe',
                    subdomain: 'sub',
                    tld: 'signum'
                });
                expect(resolver.parseURI('http://johndoe.signa')).toEqual({
                    schema: 'http',
                    domain: 'johndoe',
                    tld: 'signa',
                });
                expect(resolver.parseURI('http://sub.johndoe.signum')).toEqual({
                    schema: 'http',
                    domain: 'johndoe',
                    subdomain: 'sub',
                    tld: 'signum'
                });
                expect(resolver.parseURI('http://johndoe.free')).toEqual({
                    schema: 'http',
                    domain: 'johndoe',
                    tld: 'free',
                });
                expect(resolver.parseURI('http://sub.johndoe.crypto')).toEqual({
                    schema: 'http',
                    domain: 'johndoe',
                    subdomain: 'sub',
                    tld: 'crypto'
                });
                expect(resolver.parseURI('http://sub.johndoe.sig')).toEqual({
                    schema: 'http',
                    domain: 'johndoe',
                    subdomain: 'sub',
                    tld: 'sig'
                });
                expect(resolver.parseURI('http://sub.johndoe.web3')).toEqual({
                    schema: 'http',
                    domain: 'johndoe',
                    subdomain: 'sub',
                    tld: 'web3'
                });
            });

            it('should throw on unsupported scheme', () => {
                // @ts-ignore
                const resolver = new URIResolver(MockLedger);
                expect(() => resolver.parseURI('mailto://sub.johndoe.web3')).toThrow('Invalid SRC47 URI: mailto://sub.johndoe.web3');
            });
            it('should throw on unknown TLD - common URLs', () => {
                // @ts-ignore
                const resolver = new URIResolver(MockLedger);
                expect(() => resolver.parseURI('http://sub.johndoe.de')).toThrow('Invalid SRC47 URI - Unsupported TLD: de');
            });
        }
    );
});
