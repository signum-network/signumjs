# @signumjs/crypto

Cryptographic functions for building Signum apps.

[![Featured on Openbase](https://badges.openbase.com/js/featured/@signumjs/crypto.svg?token=ShJWpDur1ZmdRPNkvCiTvHa1r/JOG+8TkABhdRCIZbI=)](https://openbase.com/js/@signumjs/crypto?utm_source=embedded&amp;utm_medium=badge&amp;utm_campaign=rate-badge)

## Installation

SignumJS can be used with NodeJS or Web. Two formats are available

### Using with NodeJS and/or modern web frameworks

Install using [npm](https://www.npmjs.org/):

```
npm install @signumjs/crypto
```

or using [yarn](https://yarnpkg.com/):

``` yarn
yarn add @signumjs/crypto
```

#### Example

```js
import {sha256AsHex} from '@signumjs/crypto'
console.log(sha256AsHex('test'))
```


### Using in classic `<script>`

Each package is available as bundled standalone library using UMD.
This way _signumJS_ can be used also within `<script>`-Tags.
This might be useful for Wordpress and/or other PHP applications.

Just import the package using the HTML `<script>` tag.

`<script src='https://cdn.jsdelivr.net/npm/@signumjs/crypto/dist/signumjs.crypto.min.js'></script>`


#### Example

```js
console.log(sig$crypto.sha256AsHex('test'))
```

See more here:
[@signumjs/crypto Online Documentation](https://signum-network.github.io/signumjs/module/crypto)


## Crossplatform Usage

The crypto package is built to be used out of the box in modern web browsers and NodeJS (and alike backends).
Depending on the runtime environment the correct `CryptoProvider`-implementation is being used for cryptographic routines.
In a web browser the [Crypto Web API](https://developer.mozilla.org/en-US/docs/Web/API/Crypto) is used, i.e. a secure (https) environment is required.
In NodeJS the [NodeJS Crypto API](https://nodejs.org/api/crypto.html) is used.

> For web `localhost` is considered a secure context


### Implementing CryptoProvider-Interface

If needed in other environments, e.g. React Native, a custom implementation of the `CryptoProvider` interface is required.
The interface implements the bare minimum crypto functions needed for Signum:

```ts
export interface CryptoProvider {
    encryptAes256Cbc(plaintext: Uint8Array, key: Uint8Array): Promise<Uint8Array>;

    decryptAes256Cbc(ciphertext: Uint8Array, key: Uint8Array): Promise<Uint8Array>;

    sha256(data: ArrayBuffer): Promise<Uint8Array>;

    getRandomValues(array: Uint8Array): Uint8Array;
}
```

Like this:

```ts
import {CryptoProvider} from '@signumjs/crypto'

class CustomCryptoProvider implements CryptoProvider {
    decryptAes256Cbc(ciphertext: Uint8Array, key: Uint8Array): Promise<Uint8Array> {
        // Do your platforms implementation here
        return Promise.resolve(undefined);
    }

    encryptAes256Cbc(plaintext: Uint8Array, key: Uint8Array): Promise<Uint8Array> {
        // Do your platforms implementation here
        return Promise.resolve(undefined);
    }

    getRandomValues(array: Uint8Array): Uint8Array {
        // Do your platforms implementation here
        return undefined;
    }

    sha256(data: ArrayBuffer): Promise<Uint8Array> {
        // Do your platforms implementation here
        return Promise.resolve(undefined);
    }

}
```

Then use the custom crypto provider like this:

```ts
import {Crypto, sha256AsHex} from '@signumjs/crypto'

Crypto.getInstance().setCustomProvider(new CustomCryptoProvider());

(async ()=> {
    // internally uses the custom crypto provider
    console.log("SHA256", await sha256AsHex("blablubb"))
})()

```

