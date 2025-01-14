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
import {sha256AsHex, Crypto, NodeJSCryptoProvider} from '@signumjs/crypto'

Crypto.init(new NodeJSCryptoProvider()); // or WebCryptoProvider
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

> The "legacy" web bundle initializes the Crypto module automatically with the WebCryptoAdapter. So, no initialization is necessary.

See more here:
[@signumjs/crypto Online Documentation](https://signum-network.github.io/signumjs/modules/crypto.html)


## Crossplatform Usage

As there are different crypto implementations for different platforms available the underlying crypto contexts need to be initialized. 
The crypto package provides used out of the box implementations for modern web browsers and NodeJS (and alike backends, i.e. deno and bun).
Depending on the runtime environment the correct `CryptoAdapter`-implementation needs to be set for cryptographic routines.
In a web browser the [Crypto Web API](https://developer.mozilla.org/en-US/docs/Web/API/Crypto) is used, i.e. a secure (https) environment is required.
In NodeJS the [NodeJS Crypto API](https://nodejs.org/api/crypto.html) is used.

Run the following before any usage of crypto functions

__Web__

```ts
import {Crypto, WebCryptoAdapter} from "@signumjs/crypto"
Crypto.init(new WebCryptoAdapter());
```

__NodeJS__ (Deno, Bun)

```ts
import {Crypto, NodeJSCryptoAdapter} from "@signumjs/crypto"
Crypto.init(new NodeJSCryptoAdapter());
```


> For web `localhost` is considered a secure context

> If using `signumjs.crypto.min.js` the initialization is not required. It is automatically set to `WebCryptoAdapter`


### Implementing CryptoAdapter-Interface

If needed in other environments, e.g. React Native, a custom implementation of the `CryptoAdapter` interface is required.
The interface implements the bare minimum crypto functions needed for Signum:

```ts
export interface CryptoAdapter {
    encryptAes256Cbc(plaintext: Uint8Array, key: Uint8Array): Promise<Uint8Array>;

    decryptAes256Cbc(ciphertext: Uint8Array, key: Uint8Array): Promise<Uint8Array>;

    sha256(data: ArrayBuffer): Promise<Uint8Array>;

    getRandomValues(array: Uint8Array): Uint8Array;
}
```

Like this:

```ts
import {type CryptoAdapter} from '@signumjs/crypto'

class CustomCryptoAdapter implements CryptoAdapter {
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

    sha256(data: ArrayBuffer): Uint8Array {
        // Do your platforms implementation here
        return undefined;
    }

}
```

Then use the custom crypto provider like this:

```ts
import {Crypto, sha256AsHex} from '@signumjs/crypto'

Crypto.init(new CustomCryptoAdapter());

(async ()=> {
    // internally uses the custom crypto provider
    console.log("SHA256", await sha256AsHex("blablubb"))
})()

```

