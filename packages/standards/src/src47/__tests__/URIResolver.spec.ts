import {URIResolver} from '../URIResolver';

const TestAliases = {
    'johndoe': {
        aliasURI: JSON.stringify({vs: 1, hp: 'https://johndoe.com', ac: '1234567891011121314', 'x-custom': {foo: 'bar'}})
    },
    // single hop
    'johndoe1': {
        aliasURI: JSON.stringify({vs: 1, hp: 'https://johndoe.com', al: 'jd00001'})
    },
    'jd00001': {
        aliasURI: JSON.stringify({vs: 1, nm: 'arts', hp: 'https://signumart.io/profile/123456'})
    },
    // multi hop
    'johndoe2': {
        aliasURI: JSON.stringify({vs: 1, hp: 'https://johndoe.com', al: 'jd00002'})
    },
    'jd00002': {
        aliasURI: JSON.stringify({vs: 1, nm: 'portfolio', hp: 'https://www.linkedin.com/johndoe', al: 'jd00003'})
    },
    'jd00003': {
        aliasURI: JSON.stringify({vs: 1, nm: 'arts', hp: 'https://signumart.io/profile/123456', al: 'jd00004'})
    },
    'jd00004': {
        aliasURI: JSON.stringify({vs: 1, nm: 'social', hp: 'https://twitter.com/jd1337', 'x-custom': {foo: 'bar'}})
    },
    // circular deps - #1
    'johndoe3': {
        aliasURI: JSON.stringify({vs: 1, hp: 'https://johndoe.com', al: 'jd00005'})
    },
    'jd00005': {
        aliasURI: JSON.stringify({vs: 1, nm: 'social', hp: 'https://twitter.com/jd1337', al: 'jd00006'})
    },
    'jd00006': {
        aliasURI: JSON.stringify({vs: 1, nm: 'social', hp: 'https://twitter.com/jd1337', al: 'johndoe3'}) // refs to initial
    },
    // circular deps - #2
    'johndoe4': {
        aliasURI: JSON.stringify({vs: 1, hp: 'https://johndoe.com', al: 'jd00007'})
    },
    'jd00007': {
        aliasURI: JSON.stringify({vs: 1, nm: 'social', hp: 'https://twitter.com/jd1337', al: 'jd00008'})
    },
    'jd00008': {
        aliasURI: JSON.stringify({vs: 1, nm: 'social', hp: 'https://twitter.com/jd1337', al: 'jd00007'}) // refs to previous
    }
};


export const MockLedger = {
    alias: {
        getAliasByName: (name: string) => {
            const alias = TestAliases[name];
            // usually it returns an HttpError, but we mock that here
            return !alias ? Promise.reject('Unknown alias') : Promise.resolve(alias);
        }
    }
};

describe('URIResolver', () => {
    describe('resolve', () => {
            describe('single domain', () => {
                    it('should resolve by signum:// scheme', async () => {
                        // @ts-ignore
                        const resolver = new URIResolver(MockLedger);
                        const url = await resolver.resolve('signum://johndoe');
                        expect(url).toEqual('https://johndoe.com');
                    });
                    it('should resolve by shortcut \"$\"', async () => {
                        // @ts-ignore
                        const resolver = new URIResolver(MockLedger);
                        const url = await resolver.resolve('http://$johndoe');
                        expect(url).toEqual('https://johndoe.com');
                    });
                    it('should resolve by TLDs', async () => {
                        // @ts-ignore
                        const resolver = new URIResolver(MockLedger);
                        let url = await resolver.resolve('http://johndoe.crypto');
                        expect(url).toEqual('https://johndoe.com');
                        url = await resolver.resolve('http://johndoe.signa');
                        expect(url).toEqual('https://johndoe.com');
                        url = await resolver.resolve('https://johndoe.signum');
                        expect(url).toEqual('https://johndoe.com');
                        url = await resolver.resolve('https://johndoe.web3');
                        expect(url).toEqual('https://johndoe.com');
                        // and all the other domains
                    });
                    it('should resolve deeply', async () => {
                        // @ts-ignore
                        const resolver = new URIResolver(MockLedger);
                        const accountId = await resolver.resolve('signum://johndoe/ac');
                        expect(accountId).toEqual('1234567891011121314');
                        const custom = await resolver.resolve('signum://johndoe/x-custom');
                        expect(custom).toEqual({foo: 'bar'});
                    });
                }
            );
            describe('subdomain', () => {
                    it('should resolve by subdomain - single hop', async () => {
                        // @ts-ignore
                        const resolver = new URIResolver(MockLedger);
                        let url = await resolver.resolve('http://arts.johndoe1.crypto');
                        expect(url).toEqual('https://signumart.io/profile/123456');
                        url = await resolver.resolve('http://$arts.johndoe1');
                        expect(url).toEqual('https://signumart.io/profile/123456');
                    });
                    it('should resolve by subdomain - multi hop', async () => {
                        // @ts-ignore
                        const resolver = new URIResolver(MockLedger);
                        let url = await resolver.resolve('http://arts.johndoe2.crypto');
                        expect(url).toEqual('https://signumart.io/profile/123456');
                        url = await resolver.resolve('http://$arts.johndoe2');
                        expect(url).toEqual('https://signumart.io/profile/123456');
                        url = await resolver.resolve('http://social.johndoe2.web3');
                        expect(url).toEqual('https://twitter.com/jd1337');
                        url = await resolver.resolve('http://$social.johndoe2');
                        expect(url).toEqual('https://twitter.com/jd1337');
                    });
                    it('should resolve deeply', async () => {
                        // @ts-ignore
                        const resolver = new URIResolver(MockLedger);
                        const accountId = await resolver.resolve('signum://johndoe/ac');
                        expect(accountId).toEqual('1234567891011121314');
                        const custom = await resolver.resolve('http://$social.johndoe2/x-custom');
                        expect(custom).toEqual({foo: 'bar'});
                    });
                }
            );

            describe('Non-successful resolutions', () => {
                    it('cannot find the domain', async () => {
                        try {
                            // @ts-ignore
                            const resolver = new URIResolver(MockLedger);
                            await resolver.resolve('http://janedoe.crypto');
                            fail('Expect exception');
                        } catch (e) {
                            expect(e.message).toMatch('Could not resolve: http://janedoe.crypto');
                        }
                    });
                    it('cannot find the subdomain', async () => {
                        try {
                            // @ts-ignore
                            const resolver = new URIResolver(MockLedger);
                            await resolver.resolve('http://weird.johndoe1.x');
                            fail('Expect exception');
                        } catch (e) {
                            expect(e.message).toMatch('Could not resolve: http://weird.johndoe1.x');
                        }
                    });
                    it('stops circular dependency - to initial domain alias', async () => {
                        try {
                            // @ts-ignore
                            const resolver = new URIResolver(MockLedger);
                            await resolver.resolve('http://weird.johndoe3.x');
                            fail('Expect exception');
                        } catch (e) {
                            expect(e.message).toMatch('Could not resolve: http://weird.johndoe3.x');
                        }
                    });
                    it('stops circular dependency - to some internal alias', async () => {
                        try {
                            // @ts-ignore
                            const resolver = new URIResolver(MockLedger);
                            await resolver.resolve('http://weird.johndoe4.x');
                            fail('Expect exception');
                        } catch (e) {
                            expect(e.message).toMatch('Could not resolve: http://weird.johndoe4.x');
                        }
                    });
                    it('invalid Uri - #1', async () => {
                        try {
                            // @ts-ignore
                            const resolver = new URIResolver(MockLedger);
                            await resolver.resolve('http://johndoe.com'); // should not resolve
                            fail('Expect exception');
                        } catch (e) {
                            expect(e.message).toMatch('Could not resolve: http://johndoe.com');
                        }
                    });
                    it('invalid Uri - #2', async () => {
                        try {
                            // @ts-ignore
                            const resolver = new URIResolver(MockLedger);
                            await resolver.resolve('');
                            fail('Expect exception');
                        } catch (e) {
                            expect(e.message).toMatch('Could not resolve: ');
                        }
                    });
                    it('invalid Uri - #3', async () => {
                        try {
                            // @ts-ignore
                            const resolver = new URIResolver(MockLedger);
                            await resolver.resolve('https://meeeeh');
                            fail('Expect exception');
                        } catch (e) {
                            expect(e.message).toMatch('Could not resolve: https://meeeeh');
                        }
                    });
                    it('should throw when deep field not available', async () => {
                        try {
                            // @ts-ignore
                            const resolver = new URIResolver(MockLedger);
                            await resolver.resolve('signum://johndoe/invalid');
                            fail('Expect exception');
                        } catch (e) {
                            expect(e.message).toMatch('Could not resolve: signum://johndoe/invalid');
                        }

                    });
                }
            );
        }
    );
    describe('parseURI', () => {
            it('should resolve by signum:// scheme', () => {
                expect(URIResolver.parseURI('signum://johndoe')).toEqual({
                    schema: 'signum',
                    domain: 'johndoe'
                });
                expect(URIResolver.parseURI('signum://sub.johndoe')).toEqual({
                    schema: 'signum',
                    domain: 'johndoe',
                    subdomain: 'sub'
                });
            });
            it('should resolve by shortcut \"$\"', () => {
                expect(URIResolver.parseURI('http://$johndoe')).toEqual({
                    schema: 'http',
                    domain: 'johndoe'
                });
                expect(URIResolver.parseURI('https://$johndoe')).toEqual({
                    schema: 'https',
                    domain: 'johndoe'
                });
                // for robustness
                expect(URIResolver.parseURI('signum://$johndoe')).toEqual({
                    schema: 'signum',
                    domain: 'johndoe'
                });
                expect(URIResolver.parseURI('http://$sub.johndoe')).toEqual({
                    schema: 'http',
                    domain: 'johndoe',
                    subdomain: 'sub'
                });
                expect(URIResolver.parseURI('https://$sub.johndoe')).toEqual({
                    schema: 'https',
                    domain: 'johndoe',
                    subdomain: 'sub'
                });
            });
            it('should resolve by TLDs', () => {
                expect(URIResolver.parseURI('http://johndoe.signum')).toEqual({
                    schema: 'http',
                    domain: 'johndoe',
                    tld: 'signum',
                });
                expect(URIResolver.parseURI('http://sub.johndoe.signum')).toEqual({
                    schema: 'http',
                    domain: 'johndoe',
                    subdomain: 'sub',
                    tld: 'signum'
                });
                expect(URIResolver.parseURI('http://johndoe.signa')).toEqual({
                    schema: 'http',
                    domain: 'johndoe',
                    tld: 'signa',
                });
                expect(URIResolver.parseURI('http://sub.johndoe.signum')).toEqual({
                    schema: 'http',
                    domain: 'johndoe',
                    subdomain: 'sub',
                    tld: 'signum'
                });
                expect(URIResolver.parseURI('http://johndoe.free')).toEqual({
                    schema: 'http',
                    domain: 'johndoe',
                    tld: 'free',
                });
                expect(URIResolver.parseURI('http://sub.johndoe.crypto')).toEqual({
                    schema: 'http',
                    domain: 'johndoe',
                    subdomain: 'sub',
                    tld: 'crypto'
                });
                expect(URIResolver.parseURI('http://sub.johndoe.sig')).toEqual({
                    schema: 'http',
                    domain: 'johndoe',
                    subdomain: 'sub',
                    tld: 'sig'
                });
                expect(URIResolver.parseURI('http://sub.johndoe.web3')).toEqual({
                    schema: 'http',
                    domain: 'johndoe',
                    subdomain: 'sub',
                    tld: 'web3'
                });
            });

            it('should throw on unsupported scheme', () => {
                expect(() => URIResolver.parseURI('mailto://sub.johndoe.web3')).toThrow('Invalid SRC47 URI: mailto://sub.johndoe.web3');
            });
            it('should throw on unknown TLD - common URLs', () => {
                expect(() => URIResolver.parseURI('http://sub.johndoe.de')).toThrow('Invalid SRC47 URI - Unsupported TLD: de');
            });
        }
    );
});
