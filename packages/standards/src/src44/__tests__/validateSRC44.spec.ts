import {validateSRC44} from '../validateSRC44';

describe('validateSRC44', () => {

    describe('full', () => {
        it('should be fine', () => {
            validateSRC44({
                'vs': 1,
                'tp': 'cex',
                'id': 'id',
                'ac': '895212263565386113',
                'nm': 'Bittrex',
                'ds': 'World class exchange at your service',
                'av': { 'QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR': 'image/gif' },
                'bg': { 'QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc': 'image/jpeg' },
                'hp': 'https://bittrex.com',
                'sr': '^[0-9a-fA-F]{24}$',
                'al': 'somealias_newFormat',
                'xt': 'QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc',
                'sc': ['https://twitter.com/bittrex']
            });
        });

        it('should be fine - less strict', () => {

            // no vs and different type
            validateSRC44({
                // @ts-ignore
                'tp': 'foo',
                'id': 'id',
                'ac': '895212263565386113',
                'nm': 'Bittrex',
                'ds': 'World class exchange at your service',
                'av': { 'QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR': 'image/gif' },
                'bg': { 'QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc': 'image/jpeg' },
                'hp': 'https://bittrex.com',
                'sr': '^[0-9a-fA-F]{24}$',
                'al': 'somealias',
                'xt': 'QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc',
                'sc': ['https://twitter.com/bittrex'],
                'x-custom': 'bla blubb'
            }, false);
        });

        it('throws error for too large object', () => {
            expect(() => {
                validateSRC44({
                    'vs': 1,
                    'tp': 'cex',
                    'nm': 'Bittrex',
                    'ds': 'World class exchange at your service',
                    'av': { 'QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR': 'image/gif' },
                    'bg': { 'QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc': 'image/jpeg' },
                    'hp': 'https://bittrex.com',
                    'sr': '^[0-9a-fA-F]{24}$',
                    'al': 'somealias',
                    'xt': 'QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc',
                    'sc': ['https://twitter.com/bittrex'],
                    'custom': 'foo'.repeat(250)
                });
            }).toThrow('Maximum length of 1000 bytes allowed - Got');
        });
    });

    describe('vs', () => {
        it('should be version 1', () => {
            validateSRC44({
                vs: 1,
                nm: 'name'
            });
        });
        it('throws error for not being version 1', () => {
            expect(() => {
                validateSRC44({
                    vs: 2,
                    nm: 'name'
                });
            }).toThrow('vs is required and must be 1 - Got 2');
        });
        it('throws error for not being required', () => {
            expect(() => {
                // @ts-ignore
                validateSRC44({nm: 'name'});
            }).toThrow('vs is required and must be 1 - Got undefined');
        });
    });

    describe('nm', () => {
        it('should be fine', () => {
            validateSRC44({
                vs: 1,
                nm: 'name'
            });
        });
        it('throws error for being too large', () => {
            expect(() => {
                validateSRC44({
                    vs: 1,
                    nm: 'name -akfjbsdgbksd gjbsdbwoebguowebguobwegowebgobweogbweog'
                });
            }).toThrow('nm must be at maximum 24 bytes - Got name -akfjbsdgbksd gjbsdbwoebguowebguobwegowebgobweogbweog');
        });
    });

    describe('ds', () => {
        it('should be fine', () => {
            validateSRC44({
                vs: 1,
                nm: 'name',
                ds: 'Some description'
            });
        });
        it('throws error for being too large', () => {
            expect(() => {
                validateSRC44({
                    vs: 1,
                    nm: 'name',
                    ds: 'foo'.repeat(150)
                });
            }).toThrow('ds must be at maximum 384 bytes - ');
        });
    });

    describe('hp', () => {
        it('should be fine', () => {
            validateSRC44({
                vs: 1,
                nm: 'name',
                hp: 'https://homepage.com'
            });
        });
        it('throws error for being too large', () => {
            expect(() => {
                validateSRC44({
                    vs: 1,
                    nm: 'name',
                    hp: 'foo'.repeat(50)
                });
            }).toThrow('hp must be at maximum 128 bytes - ');
        });
    });


    describe('id', () => {
        it('should be fine', () => {
            validateSRC44({
                vs: 1,
                nm: 'name',
                id: 'dc1de06b-a2a2-4a6e-b3e1-a5d97835667d'
            });
        });
        it('throws error for being too large', () => {
            expect(() => {
                validateSRC44({
                    vs: 1,
                    nm: 'name',
                    id: 'foo'.repeat(50)
                });
            }).toThrow('id must be at maximum 48 bytes - ');
        });
    });

    describe('tp', () => {
        it('should be fine', () => {
            validateSRC44({
                vs: 1,
                nm: 'name',
                tp: 'hum'
            });
        });
        it('throws error for wrong type', () => {
            expect(() => {
                validateSRC44({
                    vs: 1,
                    nm: 'name',
                    // @ts-ignore
                    tp: 'foo'
                });
            }).toThrow('tp must be one of [hum,smc,biz,cex,dex,oth,tok,bot] - Got foo');
        });
    });

    describe('al', () => {
        it('should be fine', () => {
            validateSRC44({
                vs: 1,
                nm: 'name',
                al: 'somealias'
            });
        });
        it('throws error for wrong alias', () => {
            expect(() => {
                validateSRC44({
                    vs: 1,
                    nm: 'name',
                    al: '@invalid alias'
                });
            }).toThrow('[SRC44 Validation Error]: al must match /^\\w{1,100}(\\.[a-zA-Z0-9]{1,40})?$/ - Got @invalid alias');
        });
        it('throws error for beign too large', () => {
            expect(() => {
                validateSRC44({
                    vs: 1,
                    nm: 'name',
                    al: 'alias'.repeat(30)
                });
            }).toThrow('al must match /^\\w{1,100}(\\.[a-zA-Z0-9]{1,40})?$/');
        });
    });


    describe('ac', () => {
        it('should be fine', () => {
            validateSRC44({
                vs: 1,
                nm: 'name',
                ac: '895212263565386113'
            });
        });
        it('throws error for wrong account Id', () => {
            expect(() => {
                validateSRC44({
                    vs: 1,
                    nm: 'name',
                    ac: '12432452'
                });
            }).toThrow('ac must match /^\\d{10,22}$/ - Got 12432452');
        });
        it('throws error for beign too large', () => {
            expect(() => {
                validateSRC44({
                    vs: 1,
                    nm: 'name',
                    ac: '74'.repeat(30)
                });
            }).toThrow('ac must match /^\\d{10,22}$/');
        });
    });

    describe('av', () => {
        it('should be fine', () => {
            validateSRC44({
                vs: 1,
                nm: 'name',
                av: {
                    'cid': 'image/svg+xml'
                }
            });
        });
        it('throws error for wrong mime type', () => {
            expect(() => {
                validateSRC44({
                    vs: 1,
                    nm: 'name',
                    av: {
                        'cid': 'application/ecmascript'
                    }
                });
            }).toThrow('Only image Mime Types allowed. Got [application/ecmascript]');
        });
        it('throws error for being not parseable', () => {
            expect(() => {
                validateSRC44({
                    vs: 1,
                    nm: 'name',
                    av: {}
                });
            }).toThrow('Could not parse IPFS Media data');
        });
    });

    describe('bg', () => {
        it('should be fine', () => {
            validateSRC44({
                vs: 1,
                nm: 'name',
                bg: {
                    'cid': 'image/svg+xml'
                }
            });
        });
        it('throws error for wrong mime type', () => {
            expect(() => {
                validateSRC44({
                    vs: 1,
                    nm: 'name',
                    bg: {
                        'cid': 'application/ecmascript'
                    }
                });
            }).toThrow('Only image Mime Types allowed. Got [application/ecmascript]');
        });
        it('throws error for being not parseable', () => {
            expect(() => {
                validateSRC44({
                    vs: 1,
                    nm: 'name',
                    bg: {}
                });
            }).toThrow('Could not parse IPFS Media data');
        });
    });

    describe('sc', () => {
        it('should be fine', () => {
            validateSRC44({
                vs: 1,
                nm: 'name',
                sc: ['url1', 'url2', 'url3']
            });
        });
        it('throws error for too many urls', () => {
            expect(() => {
                validateSRC44({
                    vs: 1,
                    nm: 'name',
                    sc: ['url1', 'url2', 'url3', 'url4']
                });
            }).toThrow('sc must be at maximum 3 items - Got 4');
        });
        it('throws error for having too large url', () => {
            expect(() => {
                validateSRC44({
                    vs: 1,
                    nm: 'name',
                    sc: ['url1', 'url2'.repeat(40) ]
                });
            }).toThrow('sc URL must be at maximum 92 characters - Got 160 for');
        });
    });
});
