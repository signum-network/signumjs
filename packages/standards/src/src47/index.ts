/**
 *
 * SRC47: Standard for [URI Resolution](https://github.com/signum-network/SIPs/blob/master/SIP/sip-47.md)
 *
 * This (sub) package helps to resolve SRC47 compliant URI to URLs referenced in Aliases.
 *
 * Resolving a URI
 *
 *  ```ts
 *  const ledger = LedgerClientFactory.create({nodeHost: "https://europe.signum.network"})
 *  const resolver = new URIResolver(ledger);
 *  const url = await resolver.resolve('http://arts.johndoe.crypto');
 *  ```
 *
 * 
 */

export * from './URIResolver';
