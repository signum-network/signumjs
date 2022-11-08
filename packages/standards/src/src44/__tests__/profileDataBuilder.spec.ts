import {ProfileDataBuilder} from '../profileDataBuilder';

describe('profileDataBuilder', () => {
    describe('create/build', () => {
        it('should create/build as expected', () => {
            const profileData = ProfileDataBuilder
                .create('Some name')
                .setAccount('895212263565386113')
                .setId('26f74a2e-91ce-47b7-83e2-16c2aed3ffc8')
                .setBackground('QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc', 'image/jpeg')
                .setAvatar('QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR', 'image/gif')
                .setSocialMediaLinks(['https://somelink.com'])
                .setAlias('alias')
                .setCustomField('xc', 'value')
                .setDescription('description')
                .setExtension('QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc')
                .setHomePage('https://homepage.com')
                .setType('oth')
                .setSendRule('^[a-Z]{3}$')
                .build();

            expect(profileData.raw).toEqual({
                'ac': '895212263565386113',
                'al': 'alias',
                'av': {
                    'QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR': 'image/gif'
                },
                'bg': {
                    'QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc': 'image/jpeg'
                },
                'ds': 'description',
                'hp': 'https://homepage.com',
                'id': '26f74a2e-91ce-47b7-83e2-16c2aed3ffc8',
                'nm': 'Some name',
                'sc': [
                    'https://somelink.com'
                ],
                'sr': '^[a-Z]{3}$',
                'tp': 'oth',
                'vs': 1,
                'xc': 'value',
                'xt': 'QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc'
            });
        });

        it('should throw exception on invalid data - wrong mime type', () => {
            expect(() => {
                ProfileDataBuilder
                    .create('Some name')
                    .setBackground('QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc', 'application/ecmascript')
                    .build();
            }).toThrow('[SRC44 Validation Error]: Only image Mime Types allowed. Got [application/ecmascript]');
        });
        it('should throw exception on invalid data - too long description', () => {
            expect(() => {
                ProfileDataBuilder
                    .create('Some name')
                    .setBackground('QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc', 'image/jpeg')
                    .setAvatar('QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR', 'image/gif')
                    .setSocialMediaLinks(['https://somelink.com'])
                    .setAlias('alias')
                    .setCustomField('xc', 'value')
                    .setDescription('description'.repeat(50))
                    .setExtension('QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc')
                    .setHomePage('https://homepage.com')
                    .setType('oth')
                    .setSendRule('^[a-Z]{3}$')
                    .build();
            }).toThrow('[SRC44 Validation Error]: ds must be at maximum 384 bytes - Got 550');
        });

        it('should throw exception on invalid data - too long description', () => {
            expect(() => {
                ProfileDataBuilder
                    .create('Some name')
                    .setBackground('QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc', 'image/jpeg')
                    .setAvatar('QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR', 'image/gif')
                    .setSocialMediaLinks(['https://somelink.com'])
                    .setAlias('alias')
                    .setCustomField('xc', 'value'.repeat(200))
                    .setDescription('description'.repeat(20))
                    .setExtension('QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc')
                    .setHomePage('https://homepage.com')
                    .setType('oth')
                    .setSendRule('^[a-Z]{3}$')
                    .build();
            }).toThrow('[SRC44 Validation Error]: Maximum length of 1000 bytes allowed - Got 1552');
        });
    });
});
