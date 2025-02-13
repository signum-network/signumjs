<p align="center">
    <img src="https://github.com/signum-network/signumjs/raw/main/assets/signumjs.png" alt="signumjs" height="128" align="center" />
</p>
<p align="center">
    The Signum Network SDK for Javascript (written in Typescript)
</p>

[![Build](https://github.com/signum-network/signumjs/workflows/Build%20SignumJS/badge.svg)](https://github.com/signum-network/signumjs/actions?query=workflow%3A%22Build+SignumJS%22)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=signum-network_signumjs&metric=alert_status)](https://sonarcloud.io/dashboard?id=signum-network_signumjs)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=signum-network_signumjs&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=signum-network_signumjs)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=signum-network_signumjs&metric=vulnerabilities)](https://sonarcloud.io/dashboard?id=signum-network_signumjs)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=signum-network_signumjs&metric=coverage)](https://sonarcloud.io/dashboard?id=signum-network_signumjs)
![npm](https://img.shields.io/npm/v/@signumjs/core.svg?style=flat)
[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@signumjs/core/badge)](https://www.jsdelivr.com/package/npm/@signumjs/core)

`@signumjs` is a modern SDK written in Typescript providing common functionalities for _browsers_ and _nodejs_ to
interact with the [Signum Network blockchain](https://signum.network/), an advanced community-driven blockchain
technology.

---------------------------------------

👷‍♂️👷‍♂️👷‍♂️ 🏗️🏗️🏗️ MODERNIZATION IN PROGRESS 🏗️🏗️🏗️ 👷‍♂️👷‍♂️👷‍♂️

- [X] CONTRACTS
- [X] CORE
- [x] CRYPTO
- [X] HTTP
- [X] UTILS
- [X] STANDARDS
- [X] WALLET
- [X] DOCUMENTATION
- [ ] MORE EXAMPLES

Version 2 is now live. There are some major changes especially for the crypto package. Check more details [here](./packages/crypto/README.md)
Consider this version as not fully stable yet.

----------------------------

Best way to start is with the extensive [Online Documentation](https://docs.signum.network/signum/signumjs)

----------------------------
## Packages

The SDK is separated in the following packages

- [@signumjs/core](https://signum-network.github.io/signumjs/modules/core.html) The main package providing an extensive API for blockchain interaction
- [@signumjs/contracts](https://signum-network.github.io/signumjs/modules/contracts.html) A package providing Signum relevant functions for _smart contracts_
- [@signumjs/crypto](https://signum-network.github.io/signumjs/modules/crypto.html) A package providing Signum relevant crypto functions
- [@signumjs/util](https://signum-network.github.io/signumjs/modules/util.html) A package providing useful functions, e.g. common conversion functions
- [@signumjs/http](https://signum-network.github.io/signumjs/modules/http.html) A package providing a _simplified_ Http layer, with consistent response types,
  and exception handling
- [@signumjs/wallets](https://signum-network.github.io/signumjs/modules/wallets.html) This package provides the communication with SIP22 compatible deeplinkable 
- [@signumjs/standards](https://signum-network.github.io/signumjs/modules/standards.html) This package provides the communication with SIP22 compatible deeplinkable 

## Installation

`@signumjs` aims modern browsers and nodejs >= v14, but can also be used as bundled JavaScript using `<script>`

### Using with NodeJS and/or modern web frameworks

Install using [npm](https://www.npmjs.org/):

```
npm install @signumjs/core
npm install @signumjs/contracts (optional)
npm install @signumjs/crypto (optional)
npm install @signumjs/util (optional)
npm install @signumjs/http (optional)
npm install @signumjs/wallets (optional)
npm install @signumjs/standards (optional)
```

or using [yarn](https://yarnpkg.com/):

``` yarn
yarn add @signumjs/core
yarn add @signumjs/contracts (optional)
yarn add @signumjs/crypto (optional)
yarn add @signumjs/util (optional)
yarn add @signumjs/http (optional)
yarn add @signumjs/wallets (optional)
yarn add @signumjs/standards (optional)
```

### Using in classic `<script>`

Each package is available as bundled standalone library using UMD. This way _SignumJS_ can be used also
within `<script>`-Tags. This might be useful for Wordpress and/or other PHP applications.

Just import one of the packages using the HTML `<script>` tag.

`<script src='https://cdn.jsdelivr.net/npm/@signumjs/core/dist/signumjs.min.js'></script>`

`<script src='https://cdn.jsdelivr.net/npm/@signumjs/contracts/dist/signumjs.contracts.min.js'></script>`

`<script src='https://cdn.jsdelivr.net/npm/@signumjs/crypto/dist/signumjs.crypto.min.js'></script>`

`<script src='https://cdn.jsdelivr.net/npm/@signumjs/http/dist/signumjs.http.min.js'></script>`

`<script src='https://cdn.jsdelivr.net/npm/@signumjs/util/dist/signumjs.util.min.js'></script>`

`<script src='https://cdn.jsdelivr.net/npm/@signumjs/wallets/dist/signumjs.wallets.min.js'></script>`

`<script src='https://cdn.jsdelivr.net/npm/@signumjs/standards/dist/signumjs.standards.min.js'></script>`

Due to the way a package is imported following global variables are provided

| Package   | Variable        |
|-----------|-----------------|
| core      | `sig$`          |
| contracts | `sig$contracts` |
| crypto    | `sig$crypto`    |
| http      | `sig$http`      |
| util      | `sig$util`      |
| wallets   | `sig$wallets`   |
| wallets   | `sig$standards` |

Examples:

```js
// using core
const ledger = sig$.LedgerClientFactory.create({
    nodeHost: "https://europe3.testnet.signum.network",
});

ledger.network.getBlockchainStatus().then(console.log);
```

```js
// using contracts
const dataView = new sig$contracts.ContractDataView(contract)
console.log(dataView.getVariable(2))
```

```js
// using crypto
console.log(sig$crypto.sha256AsHex("test"))
```

```js
// using util
const value = sig$util.Amount.fromSigna("1000")
```

```ts
// using http
const client = new sig$http.HttpClientFactory.createHttpClient('https://jsonplaceholder.typicode.com/');
client.get('/todos/1').then(console.log)
```

```ts
// using wallets
const wallet = new sig$wallets.GenericExtensionWallet()
const connection = await wallet.connect();
const subscription = connection.listen({
    onAccountChanged: (accountId, publicKey) => { /*...*/ }
})
// ...
subscription.unlisten()
```

```ts
// using standards - depends on ledger 
const ledger = sig$.LedgerClientFactory.create({
    nodeHost: "https://europe3.testnet.signum.network",
});

// create Descriptor data object
const descriptorData = sig$standards.DescriptorDataBuilder
    .create('ohager')
    .setType('hum')
    .setBackground('QmUFc4dyX7TJn5dPxp8CrcDeedoV18owTBUWApYMuF6Koc', 'image/jpeg')
    .setAvatar('QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR', 'image/gif')
    .setSocialMediaLinks(['https://somelink.com'])
    .setDescription('Just a humble dev...')
    .setHomePage('https://digital-independence.dev')
    .build();

// updates account descriptor
const client = new sig$standards.DescriptorDataClient(ledger)
const transaction = await client.setAccountDescriptor({
    descriptorData,
    senderPublicKey: '497d559d18d989b8....ed2716a4b2121902',
    senderPrivateKey: '**********************************'
});
```

## Usage

The following example shows how to interact with the blockchain, i.e. getting the balance of a specific account

### ES6/NodeJS style

In a separate file, preferably `index.js` or `main.js` write your entry point like this:

```js
import {LedgerClientFactory, ApiSettings} from '@signumjs/core'
import {Amount} from '@signumjs/util'

// this self-executing file makes turns this file into a starting point of your app
(async () => {
    try {
        const ledger = LedgerClientFactory.createClient({nodeHost: 'https://europe3.testnet.signum.network'});
        const {balanceNQT} = await ledger.account.getAccountBalance('13036514135565182944')
        console.log(`Account Balance: ${Amount.fromPlanck(balanceNQT).toString()}`)
    } catch (e) { // e is of type HttpError (as part of @signumjs/http)
        console.error(`Whooops, something went wrong: ${e.message}`)
    }
})()

```

### `<script>` style

```js
const ledger = sig$.LedgerClientFactory.create({nodeHost: 'https://europe3.testnet.signum.network'});
ledger.account.getAccountBalance('13036514135565182944')
    .then(balance => {
        console.log(`Account Balance: ${sig$util.Amount.fromPlanck(balance.balanceNQT).toString()}`)

    })
    .catch(e => { // e is of type HttpError (as part of @signumjs/http)
        console.error(`Whooops, something went wrong: ${e.message}`)
    })

```

## Development

Contributors are warmly welcome. To start your local build just hit

```bash
npm install
```

That's it!

## Building the packages

The SDK is using [Turborepo](https://turbo.build/) to manage all subpackages in a developer friendlier way:

```bash
npm run build
```

## Running Tests

1. Single test run `npm run test`
2Run end-to-end test `npm run test:e2e`
   | Keep in mind that these tests are slow as they run against true servers. And therefore, it cannot be guaranteed
   that all E2E tests always work

## Versioning and Publishing

This monorepo uses [changeset](https://github.com/changesets/changesets) to manage the versions and publish the package. We use one version for all packages.

1. Create a changeset: `npx changeset` (always include all packages)
2. Bump version: `npx changeset version`
3. Create git tag: `git tag <VERSION>` (starting with `v`, e.g. `v2.0.2`)
3. Publish `npx changeset publish --no-git-tag --otp=<NPM_OTP>`

The latter can be run as 

```bash
npm run publish v2.0.1 --otp=123456
```

> Note: Only with a valid npm OTP token
