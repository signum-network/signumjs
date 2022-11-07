import {ProfileData} from '../profileData';

const TestObject1 = {
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


describe('profileData', () => {
    describe('get', () => {
        it('should return a human friendly object', () => {
            const profile = ProfileData.parse(JSON.stringify(TestObject1));
            expect(profile.get()).toEqual(
                {
                    'alias': '@somealias',
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
    });
    describe('stringify', () => {
        it('should stringify as expected', () => {
            const profile = ProfileData.parse(JSON.stringify(TestObject1));
            expect(profile.stringify()).toEqual('{\"vs\":1,\"tp\":\"cex\",\"nm\":\"Bittrex\",\"ds\":\"World class exchange at your service\",\"av\":{\"QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR\":\"image/gif\"},\"bg\":{\"QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc\":\"image/jpeg\"},\"hp\":\"https://bittrex.com\",\"sr\":\"^[0-9a-fA-F]{24}$\",\"al\":\"@somealias\",\"xt\":\"QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc\",\"sc\":[\"https://twitter.com/bittrex\",\"https://twitter.com/bittrex2\"]}');
        });
        it('should parse as expected with custom properties', () => {
            const t = {...TestObject1, tw: 'Twitter account', xCustom: 1111};
            const profile = ProfileData.parse(JSON.stringify(t));
            expect(profile.version).toBe(1);
            expect(profile.type).toBe('cex');
            expect(profile.name).toBe('Bittrex');
            expect(profile.avatar).toEqual({
                ipfsCid: 'QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR',
                mimeType: 'image/gif'
            });
            expect(profile.background).toEqual({
                ipfsCid: 'QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc',
                mimeType: 'image/jpeg'
            });
            expect(profile.description).toBe('World class exchange at your service');
            expect(profile.alias).toBe('@somealias');
            expect(profile.homePage).toBe('https://bittrex.com');
            expect(profile.sendRule).toEqual(new RegExp('^[0-9a-fA-F]{24}$'));
            expect(profile.extension).toBe('QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc');
            expect(profile.socialMediaLinks).toEqual(['https://twitter.com/bittrex', 'https://twitter.com/bittrex2']);
            expect(profile.getCustomField('tw')).toBe('Twitter account');
            expect(profile.getCustomField('xCustom')).toBe(1111);
        });

        it('should throw exception if string is too long', () => {
            const t = {
                ...TestObject1,
                ds: 'x'.repeat(500)
            };
            expect(() => {
                ProfileData.parse(JSON.stringify(t));
            }).toThrow('ds must be at maximum 384 bytes - Got 500');
        });

        it('should throw exception if object is too large', () => {
            const t = {
                ...TestObject1,
                ds: 'x'.repeat(384),
                xc: 'foo'.repeat(500)
            };
            expect(() => {
                ProfileData.parse(JSON.stringify(t));
            }).toThrow('Maximum length of 1000 bytes allowed - Got 2263');
        });

        it('should throw exception if object is not valid - 1', () => {
            expect(() => {
                ProfileData.parse(JSON.stringify({
                    'vs': 1,
                    'al': '@somealias',
                }));
            }).toThrow('nm is required and must be at maximum 24 bytes - Got undefined');
        });

        it('should throw exception if object is not valid - 2', () => {
            expect(() => {
                ProfileData.parse(JSON.stringify({foo: 'whatever'}));
            }).toThrow('vs is required and must be 1 - Got undefined');
        });
    });
    describe('parse', () => {
        it('should parse as expected', () => {
            const profile = ProfileData.parse(JSON.stringify(TestObject1));
            expect(profile.version).toBe(1);
            expect(profile.type).toBe('cex');
            expect(profile.name).toBe('Bittrex');
            expect(profile.avatar).toEqual({
                ipfsCid: 'QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR',
                mimeType: 'image/gif'
            });
            expect(profile.background).toEqual({
                ipfsCid: 'QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc',
                mimeType: 'image/jpeg'
            });
            expect(profile.description).toBe('World class exchange at your service');
            expect(profile.alias).toBe('@somealias');
            expect(profile.homePage).toBe('https://bittrex.com');
            expect(profile.sendRule).toEqual(new RegExp('^[0-9a-fA-F]{24}$'));
            expect(profile.extension).toBe('QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc');
            expect(profile.socialMediaLinks).toEqual(['https://twitter.com/bittrex', 'https://twitter.com/bittrex2']);
        });
        it('should parse as expected with custom properties', () => {
            const t = {...TestObject1, tw: 'Twitter account', xCustom: 1111};
            const profile = ProfileData.parse(JSON.stringify(t));
            expect(profile.version).toBe(1);
            expect(profile.type).toBe('cex');
            expect(profile.name).toBe('Bittrex');
            expect(profile.avatar).toEqual({
                ipfsCid: 'QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR',
                mimeType: 'image/gif'
            });
            expect(profile.background).toEqual({
                ipfsCid: 'QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc',
                mimeType: 'image/jpeg'
            });
            expect(profile.description).toBe('World class exchange at your service');
            expect(profile.alias).toBe('@somealias');
            expect(profile.homePage).toBe('https://bittrex.com');
            expect(profile.sendRule).toEqual(new RegExp('^[0-9a-fA-F]{24}$'));
            expect(profile.extension).toBe('QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc');
            expect(profile.socialMediaLinks).toEqual(['https://twitter.com/bittrex', 'https://twitter.com/bittrex2']);
            expect(profile.getCustomField('tw')).toBe('Twitter account');
            expect(profile.getCustomField('xCustom')).toBe(1111);
        });

        it('should throw exception if string is too long', () => {
            const t = {
                ...TestObject1,
                ds: 'x'.repeat(500)
            };
            expect(() => {
                ProfileData.parse(JSON.stringify(t));
            }).toThrow('ds must be at maximum 384 bytes - Got 500');
        });

        it('should throw exception if object is too large', () => {
            const t = {
                ...TestObject1,
                ds: 'x'.repeat(384),
                xc: 'foo'.repeat(500)
            };
            expect(() => {
                ProfileData.parse(JSON.stringify(t));
            }).toThrow('Maximum length of 1000 bytes allowed - Got 2263');
        });

        it('should throw exception if object is not valid - 1', () => {
            expect(() => {
                ProfileData.parse(JSON.stringify({
                    'vs': 1,
                    'al': '@somealias',
                }));
            }).toThrow('nm is required and must be at maximum 24 bytes - Got undefined');
        });

        it('should throw exception if object is not valid - 2', () => {
            expect(() => {
                ProfileData.parse(JSON.stringify({foo: 'whatever'}));
            }).toThrow('vs is required and must be 1 - Got undefined');
        });
    });
    describe('create', () => {
        it('should create the minimum necessary profile data object', () => {
            const profileData = ProfileData.create('Some name');
            expect(profileData.raw).toEqual({
                vs: 1,
                nm: 'Some name'
            });
        });
    });
});
