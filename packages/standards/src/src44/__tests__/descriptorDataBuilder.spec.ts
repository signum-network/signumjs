import {DescriptorDataBuilder} from '../DescriptorDataBuilder';
import {DescriptorData} from '../DescriptorData';

describe('descriptorDataBuilder', () => {
    describe('create/build', () => {
        it('should create/build as expected', () => {
            const descriptorData = DescriptorDataBuilder
                .create()
                .setName('Some name')
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

            expect(descriptorData.raw).toEqual({
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
                DescriptorDataBuilder
                    .create('Some name')
                    .setBackground('QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc', 'application/ecmascript')
                    .build();
            }).toThrow('[SRC44 Validation Error]: Only image Mime Types allowed. Got [application/ecmascript]');
        });
        it('should throw exception on invalid data - too long description', () => {
            expect(() => {
                DescriptorDataBuilder
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
                DescriptorDataBuilder
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

    describe('createWith', () => {
        it('should create from another Descriptor as expected', () => {
            const builder = DescriptorDataBuilder.createWith(DescriptorData.parse(JSON.stringify({
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
            })));

            const built = builder.setName('Another Name').build();

            expect(built.name).toEqual('Another Name');
            expect(built.type).toEqual('cex');
            expect(built.alias).toEqual('somealias');
        });
    });
});
