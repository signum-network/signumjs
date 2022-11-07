import {ProfileDataBuilder} from '../profileDataBuilder';
import {ProfileDataClient} from '../profileDataClient';

const MockProfile = {
    'al': 'alias',
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
        setAccountInfo: (args: any) => Promise.resolve({transaction: 'id'})
    },
    contract: {
        getContract: () => Promise.resolve({description: MockProfileStr})
    },
    alias: {
        getAliasByName: () => Promise.resolve({aliasURI: MockProfileStr}),
        setAlias: (args: any) => Promise.resolve({transaction: 'id'})
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
            const spy = spyOn(MockLedger.account, 'setAccountInfo' );
            await client.setAccountProfile({
                profileData: ProfileDataBuilder.create('profile').build(),
                feePlanck: '100',
                senderPublicKey: 'senderPublicKey'
            });
            expect(spy).toBeCalledWith({
                   description: '{"vs":1,"nm":"profile"}',
                   feePlanck: '100',
                   name: 'profile',
                   senderPublicKey: 'senderPublicKey',
                 });
        });
    });
    describe('setAccountProfile', () => {
        it('should resolve as expected', async () => {
            // @ts-ignore
            const client = new ProfileDataClient(MockLedger);
            const spy = spyOn(MockLedger.alias, 'setAlias' );
            await client.setAliasProfile({
                aliasName: 'aliasName',
                profileData: ProfileDataBuilder.create('profile').build(),
                feePlanck: '100',
                senderPublicKey: 'senderPublicKey'
            });
            expect(spy).toBeCalledWith({
                   aliasName: 'aliasName',
                   aliasURI: '{"vs":1,"nm":"profile"}',
                   feePlanck: '100',
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
});
