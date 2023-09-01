import {DescriptorDataBuilder} from '../DescriptorDataBuilder';
import {DescriptorDataClient} from '../DescriptorDataClient';

const MockDescriptor = {
    'al': 'alias@tld',
    'ac': '895212263565386113',
    'id': 'dc1de06b-a2a2-4a6e-b3e1-a5d97835667d',
    'av': {'QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR': 'image/gif'},
    'bg': {'QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc': 'image/jpeg'},
    'ds': 'description',
    'hp': 'https://homepage.com',
    'nm': 'Some name',
    'sc': ['https://somelink.com'],
    'sr': '^[a-z]{3}$',
    'tp': 'oth',
    'vs': 1,
    'xc': 'value',
    'xt': 'QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc'
};

const MockDescriptorStr = JSON.stringify(MockDescriptor);

export const MockLedger = {
    account: {
        getAccount: () => Promise.resolve({
            name: 'Account Name',
            description: MockDescriptorStr
        }),
        setAccountInfo: (args: any) => Promise.resolve({transaction: 'id'}),
    },
    contract: {
        getContract: () => Promise.resolve({description: MockDescriptorStr, creator: 'creator'})
    },
    asset: {
        getAsset: () => Promise.resolve({
            account: '895212263565386113',
            publicKey: 'publicKey',
            description: MockDescriptorStr
        })
    },
    alias: {
        getAliasByName: () => Promise.resolve({aliasURI: MockDescriptorStr}),
        setAlias: (args: any) => Promise.resolve({transaction: 'id'}),
        getAliases: () => Promise.resolve({
            aliases: [
                {aliasURI: MockDescriptorStr},
                {aliasURI: 'some other alias'}
            ]
        })
    },
    service: {
        query: () => Promise.resolve({account: '895212263565386113'})
    }
};

describe('descriptorDataClient', () => {
    describe('getFromContract', () => {
        it('should resolve as expected', async () => {
            // @ts-ignore
            const client = new DescriptorDataClient(MockLedger);
            const descriptor = await client.getFromContract('1');
            expect(descriptor).toEqual({
                'alias': 'alias@tld',
                'account': '895212263565386113',
                'id': 'dc1de06b-a2a2-4a6e-b3e1-a5d97835667d',
                'avatar': {
                    'ipfsCid': 'QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR',
                    'mimeType': 'image/gif'
                },
                'background': {
                    'ipfsCid': 'QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc',
                    'mimeType': 'image/jpeg'
                },
                'description': 'description',
                'extension': 'QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc',
                'homePage': 'https://homepage.com',
                'name': 'Some name',
                'resolvedAlias': {
                    'alias': 'alias@tld',
                    'account': '895212263565386113',
                    'id': 'dc1de06b-a2a2-4a6e-b3e1-a5d97835667d',
                    'avatar': {
                        'ipfsCid': 'QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR',
                        'mimeType': 'image/gif'
                    },
                    'background': {
                        'ipfsCid': 'QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc',
                        'mimeType': 'image/jpeg'
                    },
                    'description': 'description',
                    'extension': 'QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc',
                    'homePage': 'https://homepage.com',
                    'name': 'Some name',
                    'sendRule': /^[a-z]{3}$/,
                    'socialMediaLinks': [
                        'https://somelink.com'
                    ],
                    'type': 'oth',
                    'version': 1,
                    'xc': 'value'
                },
                'sendRule': /^[a-z]{3}$/,
                'socialMediaLinks': [
                    'https://somelink.com'
                ],
                'type': 'oth',
                'version': 1,
                'xc': 'value'
            });
        });
    });
    describe('getFromAsset', () => {
        it('should resolve as expected', async () => {
            // @ts-ignore
            const client = new DescriptorDataClient(MockLedger);
            const descriptor = await client.getFromAsset('1');
            expect(descriptor).toEqual({
                'alias': 'alias@tld',
                'account': '895212263565386113',
                'id': 'dc1de06b-a2a2-4a6e-b3e1-a5d97835667d',
                'avatar': {
                    'ipfsCid': 'QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR',
                    'mimeType': 'image/gif'
                },
                'background': {
                    'ipfsCid': 'QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc',
                    'mimeType': 'image/jpeg'
                },
                'description': 'description',
                'extension': 'QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc',
                'homePage': 'https://homepage.com',
                'name': 'Some name',
                'resolvedAlias': {
                    'alias': 'alias@tld',
                    'account': '895212263565386113',
                    'id': 'dc1de06b-a2a2-4a6e-b3e1-a5d97835667d',
                    'avatar': {
                        'ipfsCid': 'QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR',
                        'mimeType': 'image/gif'
                    },
                    'background': {
                        'ipfsCid': 'QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc',
                        'mimeType': 'image/jpeg'
                    },
                    'description': 'description',
                    'extension': 'QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc',
                    'homePage': 'https://homepage.com',
                    'name': 'Some name',
                    'sendRule': /^[a-z]{3}$/,
                    'socialMediaLinks': [
                        'https://somelink.com'
                    ],
                    'type': 'oth',
                    'version': 1,
                    'xc': 'value'
                },
                'sendRule': /^[a-z]{3}$/,
                'socialMediaLinks': [
                    'https://somelink.com'
                ],
                'type': 'oth',
                'version': 1,
                'xc': 'value'
            });
        });
    });
    describe('getFromAccount', () => {
        it('should resolve as expected', async () => {
            // @ts-ignore
            const client = new DescriptorDataClient(MockLedger);
            const descriptor = await client.getFromAccount('1');
            expect(descriptor).toEqual({
                'alias': 'alias@tld',
                'account': '895212263565386113',
                'id': 'dc1de06b-a2a2-4a6e-b3e1-a5d97835667d',

                'avatar': {
                    'ipfsCid': 'QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR',
                    'mimeType': 'image/gif'
                },
                'background': {
                    'ipfsCid': 'QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc',
                    'mimeType': 'image/jpeg'
                },
                'description': 'description',
                'extension': 'QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc',
                'homePage': 'https://homepage.com',
                'name': 'Some name',
                'resolvedAlias': {
                    'alias': 'alias@tld',
                    'account': '895212263565386113',
                    'id': 'dc1de06b-a2a2-4a6e-b3e1-a5d97835667d',

                    'avatar': {
                        'ipfsCid': 'QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR',
                        'mimeType': 'image/gif'
                    },
                    'background': {
                        'ipfsCid': 'QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc',
                        'mimeType': 'image/jpeg'
                    },
                    'description': 'description',
                    'extension': 'QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc',
                    'homePage': 'https://homepage.com',
                    'name': 'Some name',
                    'sendRule': /^[a-z]{3}$/,
                    'socialMediaLinks': [
                        'https://somelink.com'
                    ],
                    'type': 'oth',
                    'version': 1,
                    'xc': 'value'
                },
                'sendRule': /^[a-z]{3}$/,
                'socialMediaLinks': [
                    'https://somelink.com'
                ],
                'type': 'oth',
                'version': 1,
                'xc': 'value'
            });
        });
    });
    describe('setAccountDescriptor', () => {
        it('should set as expected - default domain', async () => {
            // @ts-ignore
            const client = new DescriptorDataClient(MockLedger);
            const spy = spyOn(MockLedger.account, 'setAccountInfo');
            await client.setAccountDescriptor({
                descriptorData: DescriptorDataBuilder.create('descriptor').build(),
                senderPublicKey: 'senderPublicKey'
            });
            expect(spy).toBeCalledWith({
                description: '{"vs":1,"nm":"descriptor"}',
                feePlanck: '20000000',
                name: 'descriptor',
                senderPublicKey: 'senderPublicKey',
            });
        });
        it('should resolve as expected - custom fee', async () => {
            // @ts-ignore
            const client = new DescriptorDataClient(MockLedger);
            const spy = spyOn(MockLedger.account, 'setAccountInfo');
            await client.setAccountDescriptor({
                descriptorData: DescriptorDataBuilder.create('descriptor').build(),
                feePlanck: '200',
                senderPublicKey: 'senderPublicKey'
            });
            expect(spy).toBeCalledWith({
                description: '{"vs":1,"nm":"descriptor"}',
                feePlanck: '200',
                name: 'descriptor',
                senderPublicKey: 'senderPublicKey',
            });
        });
    });
    describe('setAliasDescriptor', () => {
        it('should set as expected', async () => {
            // @ts-ignore
            const client = new DescriptorDataClient(MockLedger);
            const spy = spyOn(MockLedger.alias, 'setAlias');
            await client.setAliasDescriptor({
                aliasName: 'aliasName',
                descriptorData: DescriptorDataBuilder.create('descriptor').build(),
                senderPublicKey: 'senderPublicKey'
            });
            expect(spy).toBeCalledWith({
                aliasName: 'aliasName',
                aliasURI: '{"vs":1,"nm":"descriptor"}',
                feePlanck: '20000000',
                senderPublicKey: 'senderPublicKey',
            });
        });
        it('should set as expected - custom tld', async () => {
            // @ts-ignore
            const client = new DescriptorDataClient(MockLedger);
            const spy = spyOn(MockLedger.alias, 'setAlias');
            await client.setAliasDescriptor({
                aliasName: 'aliasName',
                tld: 'custom',
                descriptorData: DescriptorDataBuilder.create('descriptor').build(),
                senderPublicKey: 'senderPublicKey'
            });
            expect(spy).toBeCalledWith({
                aliasName: 'aliasName',
                tld: 'custom',
                aliasURI: '{"vs":1,"nm":"descriptor"}',
                feePlanck: '20000000',
                senderPublicKey: 'senderPublicKey',
            });
        });

        it('should set as expected - custom fee', async () => {
            // @ts-ignore
            const client = new DescriptorDataClient(MockLedger);
            const spy = spyOn(MockLedger.alias, 'setAlias');
            await client.setAliasDescriptor({
                aliasName: 'aliasName',
                feePlanck: '200',
                descriptorData: DescriptorDataBuilder.create('descriptor').build(),
                senderPublicKey: 'senderPublicKey'
            });
            expect(spy).toBeCalledWith({
                aliasName: 'aliasName',
                aliasURI: '{"vs":1,"nm":"descriptor"}',
                feePlanck: '200',
                senderPublicKey: 'senderPublicKey',
            });
        });

    });
    describe('getFromAlias', () => {
        it('should resolve as expected', async () => {
            // @ts-ignore
            const client = new DescriptorDataClient(MockLedger);
            const descriptor = await client.getFromAlias('alias');
            expect(descriptor).toEqual({
                'alias': 'alias@tld',
                'account': '895212263565386113',
                'id': 'dc1de06b-a2a2-4a6e-b3e1-a5d97835667d',
                'avatar': {
                    'ipfsCid': 'QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR',
                    'mimeType': 'image/gif'
                },
                'background': {
                    'ipfsCid': 'QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc',
                    'mimeType': 'image/jpeg'
                },
                'description': 'description',
                'extension': 'QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc',
                'homePage': 'https://homepage.com',
                'name': 'Some name',
                'sendRule': /^[a-z]{3}$/,
                'socialMediaLinks': [
                    'https://somelink.com'
                ],
                'type': 'oth',
                'version': 1,
                'xc': 'value'
            });
        });
    });
    describe('getAccountByAlias', () => {
        it('should resolve as expected', async () => {
            // @ts-ignore
            const client = new DescriptorDataClient(MockLedger);
            const account = await client.getAccountByAlias('alias');
            expect(account).toEqual({
                'description': '{"al":"alias@tld","ac":"895212263565386113","id":"dc1de06b-a2a2-4a6e-b3e1-a5d97835667d","av":{"QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR":"image/gif"},"bg":{"QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc":"image/jpeg"},"ds":"description","hp":"https://homepage.com","nm":"Some name","sc":["https://somelink.com"],"sr":"^[a-z]{3}$","tp":"oth","vs":1,"xc":"value","xt":"QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc"}',
                'name': 'Account Name',
            });
        });
        it('should return null, of not found', async () => {
            const Ledger = {
                ...MockLedger,
                alias: {
                    getAliasByName: () => Promise.reject('Not found'),
                    setAlias: (args: any) => Promise.resolve({transaction: 'id'})
                },
            };
            // @ts-ignore
            const client = new DescriptorDataClient(Ledger);
            const account = await client.getAccountByAlias('alias');
            expect(account).toBeNull();
        });
    });
    describe('getAssetBranding', () => {
        it('should get branding as expected', async () => {
            // @ts-ignore
            const client = new DescriptorDataClient(MockLedger);
            const brands = await client.getAssetBranding('dc1de06b-a2a2-4a6e-b3e1-a5d97835667d');
            expect(brands).toHaveLength(1);
            expect(brands[0]).toEqual({
                'account': '895212263565386113',
                'alias': 'alias@tld',
                'avatar': {
                    'ipfsCid': 'QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR',
                    'mimeType': 'image/gif'
                },
                'background': {
                    'ipfsCid': 'QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc',
                    'mimeType': 'image/jpeg'
                },
                'description': 'description',
                'extension': 'QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc',
                'homePage': 'https://homepage.com',
                'id': 'dc1de06b-a2a2-4a6e-b3e1-a5d97835667d',
                'name': 'Some name',
                'sendRule': /^[a-z]{3}$/,
                'socialMediaLinks': [
                    'https://somelink.com'
                ],
                'type': 'oth',
                'version': 1,
                'xc': 'value'
            });
        });
        it('should get nothing as tokenId does not match', async () => {
            // @ts-ignore
            const client = new DescriptorDataClient(MockLedger);
            const brands = await client.getAssetBranding('1234');
            expect(brands).toHaveLength(0);
        });
        it('should get from contract', async () => {

            const Ledger = {
                ...MockLedger,
                asset: {
                    getAsset: () => Promise.resolve({
                        account: '895212263565386113',
                        publicKey: '0000000000000000000000000000000000000000000000000000000000000000',
                        description: MockDescriptorStr
                    })
                },
                contract: {
                    getContract: () => Promise.resolve({description: MockDescriptorStr, creator: '895212263565386113'})
                },
            };

            // @ts-ignore
            const client = new DescriptorDataClient(Ledger);
            const brands = await client.getAssetBranding('dc1de06b-a2a2-4a6e-b3e1-a5d97835667d');
            expect(brands).toHaveLength(1);
            expect(brands[0]).toEqual({
                'account': '895212263565386113',
                'alias': 'alias@tld',
                'avatar': {
                    'ipfsCid': 'QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR',
                    'mimeType': 'image/gif'
                },
                'background': {
                    'ipfsCid': 'QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc',
                    'mimeType': 'image/jpeg'
                },
                'description': 'description',
                'extension': 'QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc',
                'homePage': 'https://homepage.com',
                'id': 'dc1de06b-a2a2-4a6e-b3e1-a5d97835667d',
                'name': 'Some name',
                'sendRule': /^[a-z]{3}$/,
                'socialMediaLinks': [
                    'https://somelink.com'
                ],
                'type': 'oth',
                'version': 1,
                'xc': 'value'
            });
        });
        it('should get nothing as no aliases are returned for that owner', async () => {

            const Ledger = {
                ...MockLedger,
                asset: {
                    getAsset: () => Promise.resolve({
                        account: '895212263565386113',
                        publicKey: '0000000000000000000000000000000000000000000000000000000000000000',
                        description: MockDescriptorStr
                    })
                },
                account: {
                    getAccount: () => Promise.resolve({
                        name: 'Account Name',
                        description: MockDescriptorStr
                    }),
                    setAccountInfo: (args: any) => Promise.resolve({transaction: 'id'}),
                },
                alias: {
                    getAliases: () => Promise.resolve({
                        aliases: []
                    })
                },
                contract: {
                    getContract: () => Promise.resolve({description: MockDescriptorStr, creator: 'otherCreator'})
                },
            };

            // @ts-ignore
            const client = new DescriptorDataClient(Ledger);
            const brands = await client.getAssetBranding('dc1de06b-a2a2-4a6e-b3e1-a5d97835667d');
            expect(brands).toHaveLength(0);
        });
        it('should get nothing as token does not exist', async () => {

            const Ledger = {
                ...MockLedger,
                asset: {
                    getAsset: () => Promise.reject('Not found')
                },
            };

            // @ts-ignore
            const client = new DescriptorDataClient(Ledger);
            const brands = await client.getAssetBranding('dc1de06b-a2a2-4a6e-b3e1-a5d97835667d');
            expect(brands).toHaveLength(0);
        });
    });
    describe('getContractBranding', () => {
        it('should get branding as expected', async () => {
            // @ts-ignore
            const client = new DescriptorDataClient(MockLedger);
            const brands = await client.getContractBranding('dc1de06b-a2a2-4a6e-b3e1-a5d97835667d');
            expect(brands).toHaveLength(1);
            expect(brands[0]).toEqual({
                'account': '895212263565386113',
                'alias': 'alias@tld',
                'avatar': {
                    'ipfsCid': 'QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR',
                    'mimeType': 'image/gif'
                },
                'background': {
                    'ipfsCid': 'QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc',
                    'mimeType': 'image/jpeg'
                },
                'description': 'description',
                'extension': 'QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc',
                'homePage': 'https://homepage.com',
                'id': 'dc1de06b-a2a2-4a6e-b3e1-a5d97835667d',
                'name': 'Some name',
                'sendRule': /^[a-z]{3}$/,
                'socialMediaLinks': [
                    'https://somelink.com'
                ],
                'type': 'oth',
                'version': 1,
                'xc': 'value'
            });
        });
        it('should get nothing as contractId does not match', async () => {
            // @ts-ignore
            const client = new DescriptorDataClient(MockLedger);
            const brands = await client.getContractBranding('1234');
            expect(brands).toHaveLength(0);
        });
        it('should get nothing as no aliases are returned for that owner', async () => {

            const Ledger = {
                ...MockLedger,
                asset: {
                    getAsset: () => Promise.resolve({
                        account: '895212263565386113',
                        publicKey: '0000000000000000000000000000000000000000000000000000000000000000',
                        description: MockDescriptorStr
                    })
                },
                account: {
                    getAccount: () => Promise.resolve({
                        name: 'Account Name',
                        description: MockDescriptorStr
                    }),
                    setAccountInfo: (args: any) => Promise.resolve({transaction: 'id'}),
                },
                alias: {
                    getAliases: () => Promise.resolve({
                        aliases: []
                    })
                },
                contract: {
                    getContract: () => Promise.resolve({description: MockDescriptorStr, creator: 'otherCreator'})
                },
            };

            // @ts-ignore
            const client = new DescriptorDataClient(Ledger);
            const brands = await client.getContractBranding('dc1de06b-a2a2-4a6e-b3e1-a5d97835667d');
            expect(brands).toHaveLength(0);
        });
        it('should get nothing as token does not exist', async () => {

            const Ledger = {
                ...MockLedger,
                contract: {
                    getContract: () => Promise.reject('Not found')
                },
            };

            // @ts-ignore
            const client = new DescriptorDataClient(Ledger);
            const brands = await client.getContractBranding('dc1de06b-a2a2-4a6e-b3e1-a5d97835667d');
            expect(brands).toHaveLength(0);
        });
    });
    describe('setAssetBranding', () => {
        it('should set as expected', async () => {
            // @ts-ignore
            const client = new DescriptorDataClient(MockLedger);
            const spy = spyOn(MockLedger.alias, 'setAlias');
            await client.setAssetBranding({
                assetId: 'assetId',
                descriptorData: DescriptorDataBuilder.create('asset').build(),
                senderPublicKey: 'senderPublicKey'
            });
            expect(spy).toBeCalledWith({
                aliasName: 'asset_brand_assetId',
                aliasURI: '{"vs":1,"nm":"asset","id":"assetId"}',
                feePlanck: '20000000',
                senderPublicKey: 'senderPublicKey',
            });
        });

        it('should set as expected with custom tld', async () => {
            // @ts-ignore
            const client = new DescriptorDataClient(MockLedger);
            const spy = spyOn(MockLedger.alias, 'setAlias');
            await client.setAssetBranding({
                assetId: 'assetId',
                tld: 'custom',
                descriptorData: DescriptorDataBuilder.create('asset').build(),
                senderPublicKey: 'senderPublicKey'
            });
            expect(spy).toBeCalledWith({
                aliasName: 'asset_brand_assetId',
                tld: 'custom',
                aliasURI: '{"vs":1,"nm":"asset","id":"assetId"}',
                feePlanck: '20000000',
                senderPublicKey: 'senderPublicKey',
            });
        });
        it('should set as expected for contract issued token', async () => {

            const Ledger = {
                ...MockLedger,
                asset: {
                    getAsset: () => Promise.resolve({
                        account: '12243325345',
                        publicKey: '0000000000000000000000000000000000000000000000000000000000000000',
                        description: MockDescriptorStr
                    })
                },
                contract: {
                    getContract: () => Promise.resolve({description: MockDescriptorStr, creator: '895212263565386113'})
                },
            };

            // @ts-ignore
            const client = new DescriptorDataClient(Ledger);
            const spy = spyOn(Ledger.alias, 'setAlias');
            await client.setAssetBranding({
                assetId: 'assetId',
                descriptorData: DescriptorDataBuilder.create('asset').build(),
                senderPublicKey: 'senderPublicKey'
            });
            expect(spy).toBeCalledWith({
                aliasName: 'asset_brand_assetId',
                aliasURI: '{"vs":1,"nm":"asset","id":"assetId"}',
                feePlanck: '20000000',
                senderPublicKey: 'senderPublicKey',
            });
        });
        it('should throw for not owning the asset', async () => {

            const Ledger = {
                ...MockLedger,
                asset: {
                    getAsset: () => Promise.resolve({
                        account: '895212263565386113',
                        publicKey: '0000000000000000000000000000000000000000000000000000000000000000',
                        description: MockDescriptorStr
                    })
                },
            };

            try {
                // @ts-ignore
                const client = new DescriptorDataClient(Ledger);
                await client.setAssetBranding({
                    assetId: 'assetId',
                    descriptorData: DescriptorDataBuilder.create('asset').build(),
                    senderPublicKey: 'senderPublicKey'
                });
                throw new Error('Should throw error');
                // @ts-ignore
            } catch (e: any) {
                expect(e.message).toBe('Not your asset!');
            }
        });
    });
    describe('setContractBranding', () => {
        it('should set as expected', async () => {
            const Ledger = {
                ...MockLedger,
                contract: {
                    getContract: () => Promise.resolve({description: MockDescriptorStr, creator: '895212263565386113'})
                },
            };
            // @ts-ignore
            const client = new DescriptorDataClient(Ledger);
            const spy = spyOn(Ledger.alias, 'setAlias');
            await client.setContractBranding({
                contractId: 'contractId',
                descriptorData: DescriptorDataBuilder.create('contract').build(),
                senderPublicKey: 'senderPublicKey'
            });
            expect(spy).toBeCalledWith({
                aliasName: 'contract_brand_contractId',
                aliasURI: '{"vs":1,"nm":"contract","id":"contractId"}',
                feePlanck: '20000000',
                senderPublicKey: 'senderPublicKey',
            });
        });
        it('should set as expected with custom tld', async () => {
            const Ledger = {
                ...MockLedger,
                contract: {
                    getContract: () => Promise.resolve({description: MockDescriptorStr, creator: '895212263565386113'})
                },
            };
            // @ts-ignore
            const client = new DescriptorDataClient(Ledger);
            const spy = spyOn(Ledger.alias, 'setAlias');
            await client.setContractBranding({
                contractId: 'contractId',
                aliasName: 'alias',
                tld: 'custom',
                descriptorData: DescriptorDataBuilder.create('contract').build(),
                senderPublicKey: 'senderPublicKey'
            });
            expect(spy).toBeCalledWith({
                aliasName: 'alias',
                tld: 'custom',
                aliasURI: '{"vs":1,"nm":"contract","id":"contractId"}',
                feePlanck: '20000000',
                senderPublicKey: 'senderPublicKey',
            });
        });
        it('should throw for not owning the contract', async () => {

            const Ledger = {
                ...MockLedger,
                asset: {
                    getAsset: () => Promise.resolve({
                        account: '895212263565386113',
                        publicKey: '0000000000000000000000000000000000000000000000000000000000000000',
                        description: MockDescriptorStr
                    })
                },
            };

            try {
                // @ts-ignore
                const client = new DescriptorDataClient(MockLedger);

                await client.setContractBranding({
                    contractId: 'contractId',
                    descriptorData: DescriptorDataBuilder.create('contract').build(),
                    senderPublicKey: 'senderPublicKey'
                });
                throw new Error('Should throw error');
                // @ts-ignore
            } catch (e: any) {
                expect(e.message).toBe('Not your contract!');
            }
        });
    });

});
