/**
 * @module standards
 * 
 *
 * SRC44: Standard for [Descriptor Information](https://github.com/signum-network/SIPs/blob/master/SIP/sip-44.md)
 *
 * This (sub) package creates, parses and validates Signum Descriptor data.
 *
 * To create SRC44 compatible descriptor data use {@link DescriptorDataBuilder}
 *
 * ```ts
 * const descriptorData = DescriptorDataBuilder
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
 * const descriptor = DescriptorData.parse(descriptorDataString);
 * console.log(descriptor.get())
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
 * The recommended way is to use the {@link DescriptorDataClient} to fetch or set descriptor data from Accounts, Smart Contracts and/or Aliases
 *
 * Fetching descriptor data
 * ```ts
 * const ledger = LedgerClientFactory.create({nodeHost: "https://europe.signum.network"})
 * const client = new DescriptorDataClient(ledger);
 * const descriptor = await client.getFromContract('23589234982349852196');
 * ```
 *
 * Setting descriptor data
 *
 * ```ts
 *  const ledger = LedgerClientFactory.create({nodeHost: "https://europe.signum.network"})
 *  const client = new DescriptorDataClient(ledger);
 *  const descriptorData = DescriptorDataBuilder
 *                         .create('ohager')
 *                         .setType('hum')
 *                         .setBackground('QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc', 'image/jpeg')
 *                         .setAvatar('QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR', 'image/gif')
 *                         .setSocialMediaLinks(['https://somelink.com'])
 *                         .setDescription('Just a humble dev...')
 *                         .setHomePage('https://digital-independence.dev')
 *                         .build();
 *
 *  const transaction = await client.setAccountDescriptor({
 *                 descriptorData,
 *                 feePlanck: '100',
 *                 senderPublicKey: '497d559d18d989b8....ed2716a4b2121902',
 *                 senderPrivateKey: '**********************************'
 *                 });
 * ```
 *
 */

export * from './typings';
export * from './exceptions';
export * from './DescriptorData';
export * from './DescriptorDataClient';
export * from './DescriptorDataBuilder';
