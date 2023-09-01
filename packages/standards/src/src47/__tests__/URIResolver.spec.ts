import {KnownTlds, URIResolver} from '../URIResolver';

const TestAliases = {
    'johndoe': {
        aliasURI: JSON.stringify({vs: 1, hp: 'https://johndoe.com', ac: '1234567891011121314', 'x-custom': {foo: 'bar'}})
    },
    'john_doe': {
        aliasURI: JSON.stringify({vs: 1, hp: 'https://johndoe.com', ac: '1234567891011121314', 'x-custom': {foo: 'bar'}})
    },
    'johndoe@signum': {
        aliasURI: JSON.stringify({vs: 1, hp: 'https://johndoe.com', ac: '1234567891011121314', 'x-custom': {foo: 'bar'}})
    },
    'johndoe@crypto': {
        aliasURI: JSON.stringify({vs: 1, hp: 'https://johndoe.com', ac: '1234567891011121314', 'x-custom': {foo: 'bar'}})
    },
    'johndoe@web3': {
        aliasURI: JSON.stringify({vs: 1, hp: 'https://johndoe.com', ac: '1234567891011121314', 'x-custom': {foo: 'bar'}})
    },
    // single hop
    'johndoe1': {
        aliasURI: JSON.stringify({vs: 1, hp: 'https://johndoe.com', al: 'jd00001@web3'})
    },
    'johndoe1@crypto': {
        aliasURI: JSON.stringify({vs: 1, hp: 'https://johndoe.com', al: 'jd00001@web3'})
    },
    'jd00001@web3': {
        aliasURI: JSON.stringify({vs: 1, nm: 'arts', ac: '1234567891011121314', hp: 'https://signumart.io/profile/123456'})
    },
    // multi hop
    'johndoe2': {
        aliasURI: JSON.stringify({vs: 1, hp: 'https://johndoe.com', al: 'jd00002'})
    },
    'johndoe2@signum': {
        aliasURI: JSON.stringify({vs: 1, hp: 'https://johndoe.com', al: 'jd00002'})
    },
    'johndoe2@crypto': {
        aliasURI: JSON.stringify({vs: 1, hp: 'https://johndoe.com', al: 'jd00002'})
    },
    'johndoe2@web3': {
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
        getAliasByName: (name: string, tld?: string) => {
            const alias = tld && tld !== 'signum' ? TestAliases[`${name}@${tld}`] : TestAliases[name];
            // usually it returns an HttpError, but we mock that here
            return !alias ? Promise.reject('Unknown alias') : Promise.resolve(alias);
        }
    }
};

describe('URIResolver', () => {


    describe('resolve', () => {
            describe('single domain', () => {
                    it('should resolve by TLDs', async () => {
                        // @ts-ignore
                        const resolver = new URIResolver(MockLedger);
                        let url = await resolver.resolve('http://johndoe.crypto');
                        expect(url).toEqual('https://johndoe.com');
                        url = await resolver.resolve('https://johndoe.signum');
                        expect(url).toEqual('https://johndoe.com');
                        url = await resolver.resolve('https://johndoe.web3');
                        expect(url).toEqual('https://johndoe.com');
                        url = await resolver.resolve('https://johndoe');
                        expect(url).toEqual('https://johndoe.com');
                        // and all the other domains
                    });
                    it('should resolve by TLDs using `@`', async () => {
                        // @ts-ignore
                        const resolver = new URIResolver(MockLedger);
                        let url = await resolver.resolve('http://johndoe@crypto');
                        expect(url).toEqual('https://johndoe.com');
                        url = await resolver.resolve('https://johndoe@signum');
                        expect(url).toEqual('https://johndoe.com');
                        url = await resolver.resolve('https://johndoe@web3');
                        expect(url).toEqual('https://johndoe.com');
                        // and all the other domains
                    });
                    it('should resolve deeply', async () => {
                        // @ts-ignore
                        const resolver = new URIResolver(MockLedger);
                        let accountId = await resolver.resolve('http://johndoe.signum/ac');
                        expect(accountId).toEqual('1234567891011121314');
                        accountId = await resolver.resolve('http://johndoe/ac');
                        expect(accountId).toEqual('1234567891011121314');
                        const custom = await resolver.resolve('https://johndoe.signum/x-custom');
                        expect(custom).toEqual({foo: 'bar'});
                    });
                }
            );
            describe('subdomain', () => {
                    it('should resolve by subdomain (with tld) - single hop', async () => {
                        // @ts-ignore
                        const resolver = new URIResolver(MockLedger);
                        const url = await resolver.resolve('http://arts.johndoe1.crypto');
                        expect(url).toEqual('https://signumart.io/profile/123456');
                    });
                    it('should resolve by subdomain - multi hop', async () => {
                        // @ts-ignore
                        const resolver = new URIResolver(MockLedger);
                        let url = await resolver.resolve('http://arts.johndoe2.crypto');
                        expect(url).toEqual('https://signumart.io/profile/123456');
                        url = await resolver.resolve('http://social.johndoe2@web3');
                        expect(url).toEqual('https://twitter.com/jd1337');
                    });
                    it('should resolve deeply', async () => {
                        // @ts-ignore
                        const resolver = new URIResolver(MockLedger);
                        let accountId = await resolver.resolve('https://johndoe.signum/ac');
                        expect(accountId).toEqual('1234567891011121314');
                        accountId = await resolver.resolve('https://arts.johndoe1/ac');
                        expect(accountId).toEqual('1234567891011121314');

                        let custom = await resolver.resolve('http://social.johndoe2/x-custom');
                        expect(custom).toEqual({foo: 'bar'});
                        custom = await resolver.resolve('http://social.johndoe2@signum/x-custom');
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
                            await resolver.resolve('http://johndoe.signum/invalid');
                            fail('Expect exception');
                        } catch (e) {
                            expect(e.message).toMatch('Could not resolve: http://johndoe.signum/invalid');
                        }

                    });
                }
            );
        }
    );
    describe('parseURI', () => {
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
                expect(URIResolver.parseURI('http://johndoe@signa')).toEqual({
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
                expect(URIResolver.parseURI('http://johndoe@free')).toEqual({
                    schema: 'http',
                    domain: 'johndoe',
                    tld: 'free',
                });
                expect(URIResolver.parseURI('http://sub.johndoe@crypto')).toEqual({
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
                expect(URIResolver.parseURI('http://sub.johndoe@customtld')).toEqual({
                    schema: 'http',
                    domain: 'johndoe',
                    subdomain: 'sub',
                    tld: 'customtld'
                });
            });
            it('should resolve without default TLD "signum"', () => {
                expect(URIResolver.parseURI('http://johndoe')).toEqual({
                    schema: 'http',
                    domain: 'johndoe',
                    tld: 'signum',
                });
                expect(URIResolver.parseURI('http://sub.johndoe')).toEqual({
                    schema: 'http',
                    domain: 'johndoe',
                    subdomain: 'sub',
                    tld: 'signum'
                });
                expect(URIResolver.parseURI('http://sub.johndoe/ac')).toEqual({
                    schema: 'http',
                    domain: 'johndoe',
                    subdomain: 'sub',
                    path: 'ac',
                    tld: 'signum'
                });
            });

            it('should throw on unsupported scheme', () => {
                expect(() => URIResolver.parseURI('mailto://sub.johndoe.web3')).toThrow('Invalid SRC47 URI: mailto://sub.johndoe@web3');
            });
        }
    );

    describe('convertKnownTldUri', () => {
        it('should convert known TLD in the URI', () => {
            for (const tld of KnownTlds) {
                const uri = `http://subdomain.domain.${tld}`;
                const convertedUri = URIResolver.convertKnownTldUri(uri);
                expect(convertedUri).toEqual(`http://subdomain.domain@${tld}`);
            }
        });
        it('should convert known TLD in the URI', () => {
            for (const tld of KnownTlds) {
                const uri = `https://domain.${tld}`;
                const convertedUri = URIResolver.convertKnownTldUri(uri);
                expect(convertedUri).toEqual(`https://domain@${tld}`);
            }
        });

        it('should not convert unknown TLD in the URI', () => {
            const uri = 'http://example@org';
            const convertedUri = URIResolver.convertKnownTldUri(uri);
            expect(convertedUri).toEqual('http://example@org');
        });
        it('should not convert unknown TLD in the URI - 2', () => {
            const uri = 'http://example.org';
            const convertedUri = URIResolver.convertKnownTldUri(uri);
            expect(convertedUri).toEqual('http://example.org');
        });

        it('should handle case-insensitive TLDs', () => {
            const uri = 'http://EXample@COM';
            const convertedUri = URIResolver.convertKnownTldUri(uri);
            expect(convertedUri).toEqual('http://example@com');
        });

        it('should handle append further (deep) field paths - domain only', () => {
            for (const tld of KnownTlds) {
                const uri = `https://domain.${tld}/ac`;
                const convertedUri = URIResolver.convertKnownTldUri(uri);
                expect(convertedUri).toEqual(`https://domain@${tld}/ac`);
            }
        });

        it('should handle append further (deep) field paths - with subdomains', () => {
            for (const tld of KnownTlds) {
                const uri = `http://subdomain.domain.${tld}/ac`;
                const convertedUri = URIResolver.convertKnownTldUri(uri);
                expect(convertedUri).toEqual(`http://subdomain.domain@${tld}/ac`);
            }
        });

        it('should handle append further (deep) field paths - with subdomains and @', () => {
            for (const tld of KnownTlds) {
                const uri = `http://subdomain.domain@${tld}/ac`;
                const convertedUri = URIResolver.convertKnownTldUri(uri);
                expect(convertedUri).toEqual(`http://subdomain.domain@${tld}/ac`);
            }
        });
    });

});
