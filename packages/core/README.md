# @signumjs/core

Core module to build cool apps for the Signum blockchain platform 

## Installation

SignumJS is an isomorphic SDK and can be used with NodeJS, Web Browser, and even React Native. 
For non-pure Javascript Apps, e.g. PHP, .Net, it is possible to use a bundled/minified version.  

### Using with NodeJS and/or modern web frameworks

Install using [npm](https://www.npmjs.org/):

```
npm install @signumjs/core
```

or using [yarn](https://yarnpkg.com/):

```
yarn add @signumjs/core
```

#### Example

```js
import {LedgerClientFactory} from '@signumjs/core'
import {Amount} from '@signumjs/util'

const ledger = LedgerClientFactory.createClient({
    nodeHost: "https://europe3.testnet.network"
});

// this self-executing file makes turns this file into a starting point of your app

(async () => {
    try {
        const {balanceNQT} = await ledger.account.getAccountBalance('13036514135565182944')
        console.log(`Account Balance: ${Amount.fromPlanck(balanceNQT).toString()}`)
    } catch (e) { // e is of type HttpError (as part of @signumjs/http)
        console.error(`Whooops, something went wrong: ${e.message}`)
    }
})()
```


### Using in classic `<script>` 

> This is useful for plain html, js, css and also for PHP, .Net etc

Each package is available as bundled standalone library using IIFE.
This way _SignumJS_ can be used also within `<script>`-Tags.
This might be useful for Wordpress and/or other PHP applications.

Just import the package using the HTML `<script>` tag.

`<script src='https://cdn.jsdelivr.net/npm/@signumjs/core/dist/signumjs.min.js'></script>`


#### Example

```js
(() => {
    const ledger = sig$.LedgerClientFactory.createClient( {nodeHost: "https://europe3.testnet.network"});
    ledger.network.getBlockchainStatus().then(console.log).catch(console.error);
})()
```

## Initialize Crypto Module

The above examples don't need any specific cryptographic features. But when it comes up to signing/creating transactions, deciphering P2P messages you may encounter the following error:

```
No Crypto Adapter provided - Use [Crypto.init()] first
```

You have to initialize the Crypto Module according to your platform somewhere in your apps entry point

__NodeJS__

```ts
import {Crypto} from "@signumjs/crypto"
import {NodeJSCryptoAdapter} from "@signumjs/crypto/adapters"

Crypto.init(new NodeJSCryptoAdapter());
```

__Web/Browser__

```ts
import {Crypto} from "@signumjs/crypto"
import {WebCryptoAdapter} from "@signumjs/crypto/adapters"

Crypto.init(new WebCryptoAdapter());
```

> For React Native/Expo see [here](https://github.com/signum-network/signumjs-react-native-crypto-adapter)


See more here:
[@signumjs/core Online Documentation](https://signum-network.github.io/signumjs/modules/core.html)
