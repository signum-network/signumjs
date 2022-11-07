/**
 *
 * SRC44: Standard for [Profile Information](https://github.com/signum-network/SIPs/blob/master/SIP/sip-44.md)
 *
 * This (sub) package creates, parses and validates Signum Profile data.
 *
 * To create SRC44 compatible profile data use [[ProfileDataBuilder]]
 *
 * ```ts
 * const profileData = ProfileDataBuilder
 *     .create('Some name')
 *     .setBackground('QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc', 'image/jpeg')
 *     .setAvatar('QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR', 'image/gif')
 *     .setSocialMediaLinks(['https://somelink.com'])
 *     .setAlias('alias')
 *     .setCustomField('xc', 'value')
 *     .setDescription('description')
 *     .setExtension('QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc')
 *     .setHomePage('https://homepage.com')
 *     .setType('oth')
 *     .setSendRule('^[a-Z]{3}$')
 *     .build();
 * ```
 *
 *
 * Parsing/Validating Data is also easy:
 *
 * ```ts
 * const profile = ProfileData.parse(profileDataString);
 * console.log(profile.get())
 * ```
 *
 * which may result in:
 *
 * ```json
 *
 * {
 *     'alias': 'somealias',
 *     'avatar': {
 *         'ipfsCid': 'QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR',
 *         'mimeType': 'image/gif',
 *     },
 *     'background': {
 *         'ipfsCid': 'QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc',
 *         'mimeType': 'image/jpeg',
 *     },
 *     'description': 'World class exchange at your service',
 *     'extension': 'QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc',
 *     'homePage': 'https://bittrex.com',
 *     'name': 'Bittrex',
 *     'sendRule': /^[0-9a-fA-F]{24}$/,
 *     'socialMediaLinks': [
 *         'https://twitter.com/bittrex',
 *         'https://twitter.com/bittrex2',
 *     ],
 *     'type': 'cex',
 *     'version': 1,
 * }
 * ```
 * The recommended way is to use the [[ProfileDataClient]] to fetch or set profile data from Accounts, Smart Contracts and/or Aliases
 *
 * Fetching profile data
 * ```ts
 * const ledger = LedgerClientFactory.create({nodeHost: "https://europe.signum.network"})
 * const client = new ProfileDataClient(ledger);
 * const profile = await client.getFromContract('23589234982349852196');
 * ```
 *
 * Setting profile data
 *
 * ```ts
 *  const ledger = LedgerClientFactory.create({nodeHost: "https://europe.signum.network"})
 *  const client = new ProfileDataClient(ledger);
 *  const profileData = ProfileDataBuilder
 *                         .create('ohager')
 *                         .setType('hum')
 *                         .setBackground('QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc', 'image/jpeg')
 *                         .setAvatar('QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR', 'image/gif')
 *                         .setSocialMediaLinks(['https://somelink.com'])
 *                         .setDescription('Just a humble dev...')
 *                         .setHomePage('https://digital-independence.dev')
 *                         .build();
 *  const transaction = await client.setAccountProfile({
 *                  profileData: ProfileDataBuilder.create('profile').build(),
 *                 feePlanck: '100',
 *                 senderPublicKey: '497d559d18d989b8....ed2716a4b2121902',
 *                 senderPrivateKey: '**********************************'
 *                 });
 * ```
 *
 * @moduledefinition standards.SRC44
 */

export * from './typings';
export * from './exceptions';
export * from './profileData';
export * from './profileDataBuilder';
export * from './profileDataClient';
