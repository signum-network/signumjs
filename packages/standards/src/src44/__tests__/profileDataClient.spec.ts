import {ProfileDataBuilder} from '../profileDataBuilder';
import {ProfileDataClient} from '../profileDataClient';

const MockProfile = {
    'al': 'alias',
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

const MockProfileStr = JSON.stringify(MockProfile);

export const MockLedger = {
    account: {
        getAccount: () => Promise.resolve({
            name: 'Account Name',
            description: MockProfileStr
        }),
        setAccountInfo: (args: any) => Promise.resolve({transaction: 'id'}),
        getAliases: () => Promise.resolve({
            aliases: [
                {aliasURI: MockProfileStr},
                {aliasURI: 'some other alias'}
            ]
        })
    },
    contract: {
        getContract: () => Promise.resolve({description: MockProfileStr, creator: 'creator'})
    },
    asset: {
        getAsset: () => Promise.resolve({
            account: '895212263565386113',
            publicKey: 'publicKey',
            description: MockProfileStr
        })
    },
    alias: {
        getAliasByName: () => Promise.resolve({aliasURI: MockProfileStr}),
        setAlias: (args: any) => Promise.resolve({transaction: 'id'})
    },
    service: {
        query: () => Promise.resolve({account: '895212263565386113'})
    }
};

describe('profileDataClient', () => {
    describe('getFromContract', () => {
        it('should resolve as expected', async () => {
            // @ts-ignore
            const client = new ProfileDataClient(MockLedger);
            const profile = await client.getFromContract('1');
            expect(profile).toEqual({
                'alias': 'alias',
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
                    'alias': 'alias',
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
            const client = new ProfileDataClient(MockLedger);
            const profile = await client.getFromAsset('1');
            expect(profile).toEqual({
                'alias': 'alias',
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
                    'alias': 'alias',
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
            const client = new ProfileDataClient(MockLedger);
            const profile = await client.getFromAccount('1');
            expect(profile).toEqual({
                'alias': 'alias',
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
                    'alias': 'alias',
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
    describe('setAccountProfile', () => {
        it('should resolve as expected', async () => {
            // @ts-ignore
            const client = new ProfileDataClient(MockLedger);
            const spy = spyOn(MockLedger.account, 'setAccountInfo');
            await client.setAccountProfile({
                profileData: ProfileDataBuilder.create('profile').build(),
                senderPublicKey: 'senderPublicKey'
            });
            expect(spy).toBeCalledWith({
                description: '{"vs":1,"nm":"profile"}',
                feePlanck: '20000000',
                name: 'profile',
                senderPublicKey: 'senderPublicKey',
            });
        });

        it('should resolve as expected - custom fee', async () => {
            // @ts-ignore
            const client = new ProfileDataClient(MockLedger);
            const spy = spyOn(MockLedger.account, 'setAccountInfo');
            await client.setAccountProfile({
                profileData: ProfileDataBuilder.create('profile').build(),
                feePlanck: '200',
                senderPublicKey: 'senderPublicKey'
            });
            expect(spy).toBeCalledWith({
                description: '{"vs":1,"nm":"profile"}',
                feePlanck: '200',
                name: 'profile',
                senderPublicKey: 'senderPublicKey',
            });
        });
    });
    describe('setAliasProfile', () => {
        it('should resolve as expected', async () => {
            // @ts-ignore
            const client = new ProfileDataClient(MockLedger);
            const spy = spyOn(MockLedger.alias, 'setAlias');
            await client.setAliasProfile({
                aliasName: 'aliasName',
                profileData: ProfileDataBuilder.create('profile').build(),
                senderPublicKey: 'senderPublicKey'
            });
            expect(spy).toBeCalledWith({
                aliasName: 'aliasName',
                aliasURI: '{"vs":1,"nm":"profile"}',
                feePlanck: '20000000',
                senderPublicKey: 'senderPublicKey',
            });
        });

        it('should resolve as expected - custom fee', async () => {
            // @ts-ignore
            const client = new ProfileDataClient(MockLedger);
            const spy = spyOn(MockLedger.alias, 'setAlias');
            await client.setAliasProfile({
                aliasName: 'aliasName',
                feePlanck: '200',
                profileData: ProfileDataBuilder.create('profile').build(),
                senderPublicKey: 'senderPublicKey'
            });
            expect(spy).toBeCalledWith({
                aliasName: 'aliasName',
                aliasURI: '{"vs":1,"nm":"profile"}',
                feePlanck: '200',
                senderPublicKey: 'senderPublicKey',
            });
        });

    });
    describe('getFromAlias', () => {
        it('should resolve as expected', async () => {
            // @ts-ignore
            const client = new ProfileDataClient(MockLedger);
            const profile = await client.getFromAlias('alias');
            expect(profile).toEqual({
                'alias': 'alias',
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
            const client = new ProfileDataClient(MockLedger);
            const account = await client.getAccountByAlias('alias');
            expect(account).toEqual({
                'description': '{"al":"alias","ac":"895212263565386113","id":"dc1de06b-a2a2-4a6e-b3e1-a5d97835667d","av":{"QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR":"image/gif"},"bg":{"QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc":"image/jpeg"},"ds":"description","hp":"https://homepage.com","nm":"Some name","sc":["https://somelink.com"],"sr":"^[a-z]{3}$","tp":"oth","vs":1,"xc":"value","xt":"QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc"}',
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
            const client = new ProfileDataClient(Ledger);
            const account = await client.getAccountByAlias('alias');
            expect(account).toBeNull();
        });
    });
    describe('getAssetBranding', () => {
        it('should get branding as expected', async () => {
            // @ts-ignore
            const client = new ProfileDataClient(MockLedger);
            const brands = await client.getAssetBranding('dc1de06b-a2a2-4a6e-b3e1-a5d97835667d');
            expect(brands).toHaveLength(1);
            expect(brands[0]).toEqual({
                'account': '895212263565386113',
                'alias': 'alias',
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
            const client = new ProfileDataClient(MockLedger);
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
                        description: MockProfileStr
                    })
                },
                contract: {
                    getContract: () => Promise.resolve({description: MockProfileStr, creator: '895212263565386113'})
                },
            };

            // @ts-ignore
            const client = new ProfileDataClient(Ledger);
            const brands = await client.getAssetBranding('dc1de06b-a2a2-4a6e-b3e1-a5d97835667d');
            expect(brands).toHaveLength(1);
            expect(brands[0]).toEqual({
                'account': '895212263565386113',
                'alias': 'alias',
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
                        description: MockProfileStr
                    })
                },
                account: {
                    getAccount: () => Promise.resolve({
                        name: 'Account Name',
                        description: MockProfileStr
                    }),
                    setAccountInfo: (args: any) => Promise.resolve({transaction: 'id'}),
                    getAliases: () => Promise.resolve({
                        aliases: []
                    })
                },
                contract: {
                    getContract: () => Promise.resolve({description: MockProfileStr, creator: 'otherCreator'})
                },
            };

            // @ts-ignore
            const client = new ProfileDataClient(Ledger);
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
            const client = new ProfileDataClient(Ledger);
            const brands = await client.getAssetBranding('dc1de06b-a2a2-4a6e-b3e1-a5d97835667d');
            expect(brands).toHaveLength(0);
        });
    });
    describe('getContractBranding', () => {
        it('should get branding as expected', async () => {
            // @ts-ignore
            const client = new ProfileDataClient(MockLedger);
            const brands = await client.getContractBranding('dc1de06b-a2a2-4a6e-b3e1-a5d97835667d');
            expect(brands).toHaveLength(1);
            expect(brands[0]).toEqual({
                'account': '895212263565386113',
                'alias': 'alias',
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
            const client = new ProfileDataClient(MockLedger);
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
                        description: MockProfileStr
                    })
                },
                account: {
                    getAccount: () => Promise.resolve({
                        name: 'Account Name',
                        description: MockProfileStr
                    }),
                    setAccountInfo: (args: any) => Promise.resolve({transaction: 'id'}),
                    getAliases: () => Promise.resolve({
                        aliases: []
                    })
                },
                contract: {
                    getContract: () => Promise.resolve({description: MockProfileStr, creator: 'otherCreator'})
                },
            };

            // @ts-ignore
            const client = new ProfileDataClient(Ledger);
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
            const client = new ProfileDataClient(Ledger);
            const brands = await client.getContractBranding('dc1de06b-a2a2-4a6e-b3e1-a5d97835667d');
            expect(brands).toHaveLength(0);
        });
    });
    describe('setAssetBranding', () => {
        it('should set as expected', async () => {
            // @ts-ignore
            const client = new ProfileDataClient(MockLedger);
            const spy = spyOn(MockLedger.alias, 'setAlias');
            await client.setAssetBranding({
                assetId: 'assetId',
                profileData: ProfileDataBuilder.create('asset').build(),
                senderPublicKey: 'senderPublicKey'
            });
            expect(spy).toBeCalledWith({
                aliasName: 'asset-brand-assetId',
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
                        description: MockProfileStr
                    })
                },
                contract: {
                    getContract: () => Promise.resolve({description: MockProfileStr, creator: '895212263565386113'})
                },
            };

            // @ts-ignore
            const client = new ProfileDataClient(Ledger);
            const spy = spyOn(Ledger.alias, 'setAlias');
            await client.setAssetBranding({
                assetId: 'assetId',
                profileData: ProfileDataBuilder.create('asset').build(),
                senderPublicKey: 'senderPublicKey'
            });
            expect(spy).toBeCalledWith({
                aliasName: 'asset-brand-assetId',
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
                        description: MockProfileStr
                    })
                },
            };

            try {
                // @ts-ignore
                const client = new ProfileDataClient(Ledger);
                await client.setAssetBranding({
                    assetId: 'assetId',
                    profileData: ProfileDataBuilder.create('asset').build(),
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
                    getContract: () => Promise.resolve({description: MockProfileStr, creator: '895212263565386113'})
                },
            };
            // @ts-ignore
            const client = new ProfileDataClient(Ledger);
            const spy = spyOn(Ledger.alias, 'setAlias');
            await client.setContractBranding({
                contractId: 'contractId',
                profileData: ProfileDataBuilder.create('contract').build(),
                senderPublicKey: 'senderPublicKey'
            });
            expect(spy).toBeCalledWith({
                aliasName: 'contract-brand-contractId',
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
                        description: MockProfileStr
                    })
                },
            };

            try {
                // @ts-ignore
                const client = new ProfileDataClient(MockLedger);

                await client.setContractBranding({
                    contractId: 'contractId',
                    profileData: ProfileDataBuilder.create('contract').build(),
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
