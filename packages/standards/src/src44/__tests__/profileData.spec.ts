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
    'al': '@somealias',
    'xt': 'QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc',
    'sc': ['https://twitter.com/bittrex', 'https://twitter.com/bittrex2']
};


describe('profileData', () => {
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
            }).toThrow('[SRC44 Parse Error]: [SRC44 Validation Error]: /ds: maxLength must NOT have more than 384 characters');
        });

        it('should throw exception if object is too large', () => {
            const t = {
                ...TestObject1,
                ds: 'x'.repeat(384),
                xc: 'foo'.repeat(500)
            };
            expect(() => {
                ProfileData.parse(JSON.stringify(t));
            }).toThrow('[SRC44 Parse Error]: Profile data exceeds maximum allowed length of 1000 bytes - Got 2263');
        });

        it('should throw exception if object is not valid - 1', () => {
            expect(() => {
                ProfileData.parse(JSON.stringify({
                    'vs': 1,
                    'al': '@somealias',
                }));
            }).toThrow(' must have required property \'nm\'');
        });

        it('should throw exception if object is not valid - 2', () => {
            expect(() => {
                ProfileData.parse(JSON.stringify({foo: 'whatever'}));
            }).toThrow(' must have required property \'vs\'');
        });
    });
});