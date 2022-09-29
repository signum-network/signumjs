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
import {encryptAES, decryptAES, hashSHA256} from '@signumjs/crypto'

const encrypted = encryptAES('test', 'key')
const decrypted = decryptAES(encrypted, 'key')
console.log(hashSHA256('test'))
console.log(decrypted)
```


### Using in classic `<script>`

Each package is available as bundled standalone library using UMD.
This way _signumJS_ can be used also within `<script>`-Tags.
This might be useful for Wordpress and/or other PHP applications.

Just import the package using the HTML `<script>` tag.

`<script src='https://cdn.jsdelivr.net/npm/@signumjs/crypto/dist/signumjs.crypto.min.js'></script>`


#### Example

```js
const encrypted = b$crypto.encryptAES("test", "key");
const decrypted = b$crypto.decryptAES(encrypted, "key");
console.log(b$crypto.hashSHA256("test"));
console.log(decrypted);
```

See more here:
[@signumjs/crypto Online Documentation](https://signum-network.github.io/signumjs/module/crypto)
