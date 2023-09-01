import {DescriptorData} from '../DescriptorData';

const TestObjectNotStrict = {
    'tp': 'foo',
    'nm': 'Bittrex',
    'ds': 'World class exchange at your service',
    'av': {'QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR': 'image/gif'},
    'bg': {'QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc': 'image/jpeg'},
    'hp': 'https://bittrex.com',
    'sr': '^[0-9a-fA-F]{24}$',
    'al': 'somealias',
    'xt': 'QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc',
    'sc': ['https://twitter.com/bittrex', 'https://twitter.com/bittrex2']
};

const TestObjectStrict = {
    'vs': 1,
    'tp': 'cex',
    'nm': 'Bittrex',
    'ds': 'World class exchange at your service',
    'av': {'QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR': 'image/gif'},
    'bg': {'QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc': 'image/jpeg'},
    'hp': 'https://bittrex.com',
    'sr': '^[0-9a-fA-F]{24}$',
    'al': 'somealias',
    'xt': 'QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc',
    'sc': ['https://twitter.com/bittrex', 'https://twitter.com/bittrex2']
};

const TestObjectAliasTld = {
    'vs': 1,
    'tp': 'cex',
    'nm': 'Bittrex',
    'ds': 'World class exchange at your service',
    'av': {'QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR': 'image/gif'},
    'bg': {'QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc': 'image/jpeg'},
    'hp': 'https://bittrex.com',
    'sr': '^[0-9a-fA-F]{24}$',
    'al': 'somealias@mytld',
    'xt': 'QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc',
    'sc': ['https://twitter.com/bittrex', 'https://twitter.com/bittrex2']
};


describe('descriptorData', () => {
    describe('get', () => {
        it('should return a human friendly object', () => {
            const descriptor = DescriptorData.parse(JSON.stringify(TestObjectStrict));
            expect(descriptor.get()).toEqual(
                {
                    'alias': 'somealias',
                    'avatar': {
                        'ipfsCid': 'QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR',
                        'mimeType': 'image/gif',
                    },
                    'background': {
                        'ipfsCid': 'QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc',
                        'mimeType': 'image/jpeg',
                    },
                    'description': 'World class exchange at your service',
                    'extension': 'QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc',
                    'homePage': 'https://bittrex.com',
                    'name': 'Bittrex',
                    'sendRule': /^[0-9a-fA-F]{24}$/,
                    'socialMediaLinks': [
                        'https://twitter.com/bittrex',
                        'https://twitter.com/bittrex2',
                    ],
                    'type': 'cex',
                    'version': 1,
                }
            );
        });
        it('should return a human friendly object with alias TLD', () => {
            const descriptor = DescriptorData.parse(JSON.stringify(TestObjectAliasTld));
            expect(descriptor.get()).toEqual(
                {
                    'alias': 'somealias@mytld',
                    'avatar': {
                        'ipfsCid': 'QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR',
                        'mimeType': 'image/gif',
                    },
                    'background': {
                        'ipfsCid': 'QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc',
                        'mimeType': 'image/jpeg',
                    },
                    'description': 'World class exchange at your service',
                    'extension': 'QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc',
                    'homePage': 'https://bittrex.com',
                    'name': 'Bittrex',
                    'sendRule': /^[0-9a-fA-F]{24}$/,
                    'socialMediaLinks': [
                        'https://twitter.com/bittrex',
                        'https://twitter.com/bittrex2',
                    ],
                    'type': 'cex',
                    'version': 1,
                }
            );
        });
        it('should return a human friendly object - with correct amount of entries', () => {
            const descriptor = DescriptorData.parse(JSON.stringify({ vs: 1, nm: 'name'}));
            const d = descriptor.get();
            expect(Object.entries(d)).toHaveLength(2);
            expect(d).toEqual(
                {
                    'version': 1,
                    'name': 'name',
                }
            );
        });
    });
    describe('stringify', () => {
        it('should stringify as expected', () => {
            const descriptor = DescriptorData.parse(JSON.stringify(TestObjectStrict));
            expect(descriptor.stringify()).toEqual('{\"vs\":1,\"tp\":\"cex\",\"nm\":\"Bittrex\",\"ds\":\"World class exchange at your service\",\"av\":{\"QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR\":\"image/gif\"},\"bg\":{\"QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc\":\"image/jpeg\"},\"hp\":\"https://bittrex.com\",\"sr\":\"^[0-9a-fA-F]{24}$\",\"al\":\"somealias\",\"xt\":\"QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc\",\"sc\":[\"https://twitter.com/bittrex\",\"https://twitter.com/bittrex2\"]}');
        });
        it('should parse as expected with custom properties', () => {
            const t = {...TestObjectStrict, tw: 'Twitter account', xCustom: 1111};
            const descriptor = DescriptorData.parse(JSON.stringify(t));
            expect(descriptor.version).toBe(1);
            expect(descriptor.type).toBe('cex');
            expect(descriptor.name).toBe('Bittrex');
            expect(descriptor.avatar).toEqual({
                ipfsCid: 'QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR',
                mimeType: 'image/gif'
            });
            expect(descriptor.background).toEqual({
                ipfsCid: 'QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc',
                mimeType: 'image/jpeg'
            });
            expect(descriptor.description).toBe('World class exchange at your service');
            expect(descriptor.alias).toBe('somealias');
            expect(descriptor.homePage).toBe('https://bittrex.com');
            expect(descriptor.sendRule).toEqual(new RegExp('^[0-9a-fA-F]{24}$'));
            expect(descriptor.extension).toBe('QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc');
            expect(descriptor.socialMediaLinks).toEqual(['https://twitter.com/bittrex', 'https://twitter.com/bittrex2']);
            expect(descriptor.getCustomField('tw')).toBe('Twitter account');
            expect(descriptor.getCustomField('xCustom')).toBe(1111);
        });

        it('should throw exception if string is too long', () => {
            const t = {
                ...TestObjectStrict,
                ds: 'x'.repeat(500)
            };
            expect(() => {
                DescriptorData.parse(JSON.stringify(t));
            }).toThrow('ds must be at maximum 384 bytes - Got 500');
        });

        it('should throw exception if object is too large', () => {
            const t = {
                ...TestObjectStrict,
                ds: 'x'.repeat(384),
                xc: 'foo'.repeat(500)
            };
            expect(() => {
                DescriptorData.parse(JSON.stringify(t));
            }).toThrow('Maximum length of 1000 bytes allowed - Got 2262');
        });

        it('should throw exception if object is not valid - 1', () => {
            expect(() => {
                DescriptorData.parse(JSON.stringify({
                    'vs': 1,
                    'al': '@somealias',
                }));
            }).toThrow('[SRC44 Validation Error]: al must match /^\\w{1,100}(@[a-zA-Z0-9]{1,40})?$/ - Got @somealias');
        });

        it('should throw exception if object is not valid - 2', () => {
            expect(() => {
                DescriptorData.parse(JSON.stringify({foo: 'whatever'}));
            }).toThrow('vs is required and must be 1 - Got undefined');
        });
    });
    describe('parse', () => {
        it('should parse as expected', () => {
            const descriptor = DescriptorData.parse(JSON.stringify(TestObjectStrict));
            expect(descriptor.version).toBe(1);
            expect(descriptor.type).toBe('cex');
            expect(descriptor.name).toBe('Bittrex');
            expect(descriptor.avatar).toEqual({
                ipfsCid: 'QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR',
                mimeType: 'image/gif'
            });
            expect(descriptor.background).toEqual({
                ipfsCid: 'QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc',
                mimeType: 'image/jpeg'
            });
            expect(descriptor.description).toBe('World class exchange at your service');
            expect(descriptor.alias).toBe('somealias');
            expect(descriptor.homePage).toBe('https://bittrex.com');
            expect(descriptor.sendRule).toEqual(new RegExp('^[0-9a-fA-F]{24}$'));
            expect(descriptor.extension).toBe('QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc');
            expect(descriptor.socialMediaLinks).toEqual(['https://twitter.com/bittrex', 'https://twitter.com/bittrex2']);
        });
        it('should parse as expected - less strict', () => {
            const descriptor = DescriptorData.parse(JSON.stringify(TestObjectNotStrict), false);
            expect(descriptor.version).toBe(1);
            expect(descriptor.type).toBe('foo');
            expect(descriptor.name).toBe('Bittrex');
            expect(descriptor.avatar).toEqual({
                ipfsCid: 'QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR',
                mimeType: 'image/gif'
            });
            expect(descriptor.background).toEqual({
                ipfsCid: 'QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc',
                mimeType: 'image/jpeg'
            });
            expect(descriptor.description).toBe('World class exchange at your service');
            expect(descriptor.alias).toBe('somealias');
            expect(descriptor.homePage).toBe('https://bittrex.com');
            expect(descriptor.sendRule).toEqual(new RegExp('^[0-9a-fA-F]{24}$'));
            expect(descriptor.extension).toBe('QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc');
            expect(descriptor.socialMediaLinks).toEqual(['https://twitter.com/bittrex', 'https://twitter.com/bittrex2']);
        });
        it('should parse as expected with custom properties', () => {
            const t = {...TestObjectStrict, tw: 'Twitter account', xCustom: 1111};
            const descriptor = DescriptorData.parse(JSON.stringify(t));
            expect(descriptor.version).toBe(1);
            expect(descriptor.type).toBe('cex');
            expect(descriptor.name).toBe('Bittrex');
            expect(descriptor.avatar).toEqual({
                ipfsCid: 'QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR',
                mimeType: 'image/gif'
            });
            expect(descriptor.background).toEqual({
                ipfsCid: 'QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc',
                mimeType: 'image/jpeg'
            });
            expect(descriptor.description).toBe('World class exchange at your service');
            expect(descriptor.alias).toBe('somealias');
            expect(descriptor.homePage).toBe('https://bittrex.com');
            expect(descriptor.sendRule).toEqual(new RegExp('^[0-9a-fA-F]{24}$'));
            expect(descriptor.extension).toBe('QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc');
            expect(descriptor.socialMediaLinks).toEqual(['https://twitter.com/bittrex', 'https://twitter.com/bittrex2']);
            expect(descriptor.getCustomField('tw')).toBe('Twitter account');
            expect(descriptor.getCustomField('xCustom')).toBe(1111);
        });

        it('should throw exception if string is too long', () => {
            const t = {
                ...TestObjectStrict,
                ds: 'x'.repeat(500)
            };
            expect(() => {
                DescriptorData.parse(JSON.stringify(t));
            }).toThrow('ds must be at maximum 384 bytes - Got 500');
        });

        it('should throw exception if object is too large', () => {
            const t = {
                ...TestObjectStrict,
                ds: 'x'.repeat(384),
                xc: 'foo'.repeat(500)
            };
            expect(() => {
                DescriptorData.parse(JSON.stringify(t));
            }).toThrow('Maximum length of 1000 bytes allowed - Got 2262');
        });

        it('should throw exception if object is not valid - 1', () => {
            expect(() => {
                DescriptorData.parse(JSON.stringify({
                    'vs': 1,
                    'nm': 'foo'.repeat(20),
                }));
            }).toThrow('nm must be at maximum 24 bytes');
        });

        it('should throw exception if object is not valid - 2', () => {
            expect(() => {
                DescriptorData.parse(JSON.stringify({foo: 'whatever'}));
            }).toThrow('vs is required and must be 1 - Got undefined');
        });
    });
    describe('create', () => {
        it('should create the minimum necessary descriptor data object', () => {
            const descriptorData = DescriptorData.create('Some Name');
            expect(descriptorData.raw).toEqual({
                vs: 1,
                nm: 'Some Name'
            });
        });
    });
    describe('estimateFeePlanck', () => {
        it('should calculate correct fee', () => {
            expect(DescriptorData.create('Some name').estimateFeePlanck()).toEqual('20000000');
            expect(DescriptorData.parse(JSON.stringify(TestObjectStrict)).estimateFeePlanck()).toEqual('60000000');
            expect(DescriptorData.parse(JSON.stringify({
                ...TestObjectStrict,
                'custom': 'custom'.repeat(50)
            })).estimateFeePlanck()).toEqual('80000000');
            expect(DescriptorData.parse(JSON.stringify({
                ...TestObjectStrict,
                'custom': 'custom'.repeat(75)
            })).estimateFeePlanck()).toEqual('100000000');
            expect(DescriptorData.parse(JSON.stringify({
                ...TestObjectStrict,
                'custom': 'custom'.repeat(90)
            })).estimateFeePlanck()).toEqual('120000000');
        });
        it('should calculate correct fee - baseFee = 0.02', () => {
            const BaseFee = 2000000;
            expect(DescriptorData.create('Some name').estimateFeePlanck(BaseFee)).toEqual('2000000');
            expect(DescriptorData.parse(JSON.stringify(TestObjectStrict)).estimateFeePlanck(BaseFee)).toEqual('6000000');
            expect(DescriptorData.parse(JSON.stringify({
                ...TestObjectStrict,
                'custom': 'custom'.repeat(50)
            })).estimateFeePlanck(BaseFee)).toEqual('8000000');
            expect(DescriptorData.parse(JSON.stringify({
                ...TestObjectStrict,
                'custom': 'custom'.repeat(75)
            })).estimateFeePlanck(BaseFee)).toEqual('10000000');
            expect(DescriptorData.parse(JSON.stringify({
                ...TestObjectStrict,
                'custom': 'custom'.repeat(90)
            })).estimateFeePlanck(BaseFee)).toEqual('12000000');
        });
        it('should throw if 1000 bytes is exceeded', () => {
            expect(() => {
                DescriptorData.parse(JSON.stringify({
                ...TestObjectStrict,
                    'custom': 'some custom content'.repeat(100)
                })).estimateFeePlanck();
            }).toThrow('[SRC44 Validation Error]: Maximum length of 1000 bytes allowed');
        });
    });
    describe('clone', () => {
        it('should clone as expected', () => {
            const descriptor = DescriptorData.parse(JSON.stringify(TestObjectStrict));
            const cloned = descriptor.clone();
            expect(cloned).not.toBe(descriptor);
            expect(cloned.raw).toEqual(descriptor.raw);
        });
    });
    describe('merge', () => {
        it('should merge as expected', () => {
            const descriptor = DescriptorData.parse(JSON.stringify(TestObjectStrict));
            const toMerge = DescriptorData.parse(JSON.stringify({
                'vs': 1,
                'nm': 'Another name',
                'tp': 'hum'
            }));
            descriptor.merge(toMerge);
            expect(descriptor.name).toEqual('Another name');
            expect(descriptor.type).toEqual('hum');
            expect(descriptor.description).toEqual('World class exchange at your service');
        });
    });
});
