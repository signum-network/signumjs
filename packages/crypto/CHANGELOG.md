# Change Log

## 2.0.8

### Patch Changes

- 8176d1c: Bringing comments back to compiled packages - they were accidentally omitted on compilation

## 2.0.7

### Patch Changes

- 1a64657: improved crypto randomness for word and string generators

## 2.0.6

### Patch Changes

- Breaking Change: renamed isAttachmentVersion to getAttachmentVersion and typed the version identifier
- Added main field in package.json to fix resolution issues

## 2.0.5

### Patch Changes

- Uses exports in package.json and minor fixes

## 2.0.4

### Patch Changes

- [Breaking Change] CryptoProvider renamed to CryptoAdapter

  - Crypto Adapters `NodeJsCryptoAdapter` and `WebCryptoAdapter` are dedicate path `@signumjs/crypto/adapters`
  - `generateMnemonic` has changed API to better support partial settings.

## 2.0.3

### Patch Changes

- Decoupled Crypto Provider. Breaking Change as this requires the developer to define the platform specific crypto provider before using the sdk

  Breaking Change:

  If you see the following error:

  ```ts
  "No Crypto Provider provided - Use [Crypto.init()] first";
  ```

  You need to initialize the crypto module with the platform specific CryptoProvider.

  **NodeJS**

  ```ts
  import { Crypto, NodeJSCryptoProvider } from "@signumjs/crypto";
  Crypto.init(new NodeJSCryptoProvider());
  ```

  **Web/Browser**

  ```ts
  import { Crypto, WebCryptoProvider } from "@signumjs/crypto";
  Crypto.init(new WebCryptoProvider());
  ```

  > Further implementations will be provided as external modules/packages, i.e. React Native Expo

## 2.0.2

### Patch Changes

- Crypto: Custom Crypto Provider on getInstance

## 2.0.1

### Patch Changes

- Added IIFE bundles

## 2.0.0

### Major Changes

- 14f4944: This new version uses a completely modernized stack (turborepo, vite, vitest). Furthermore, the crypto package was rewritten to remove deprecated crypto-js library and being extensible. The standards (SRC) packages were reorganized and finally the monitor package was removed
  Breaking Changes:
  1. `@signumjs/monitor` was removed, as not really used
  2. `@signumjs/crypto` was completely rewritten, mainly due to the deprecation of `crypto-js` and certain security implications
  3. `@signumjs/standards` were reorganized respecting the Signum Request for Comment (SRC) numbering
     How to update from 1.0 to 2.0
  4. Monitor was removed
     Drop `signumjs/monitor` (no replacement here) - if you used the monitor you can copy the code from the repo and include it manually in your code base
  5. Adjust Crypto
  - Passphrase generator was dropped, use `generateMnemonic` instead
  - `generateMasterKeys` was renamed to `generateSignKeys`
  - `hashSHA256` was renamed to `sha256AsHex` (and more sha256 hashers are available)
  - `encryptAES` and `decryptAES` were dropped - use native crypto methods for AES encryption. Signum uses for their P2P encryption a AES based algorithm using the shared key (`encryptMessage` and `encryptData`)
    > The new crypto package offers more secure random and sha256 functions and is much more flexible. Check the docs for more info
  3. Using SRC based standards
     Actually, not much to do here. It's just that the internal structure is organized by the SRC numbering.
     All notable changes to this project will be documented in this file.

## 1.0.0 (TBR)

- Rebranding
- Patched AES.decrypt method to throw concise error
- Removed crypto-js. Refactored complete interface

---

> Before Rebranding

## 0.4.1

- Patched AES.decrypt method

## 0.4.0

- Changed License: From GPL-3.0 to Apache 2.0
- Updated seedrandom from 3.0.1 to 3.0.5 (removes eval)

## 0.3.0

- Moved typings into src folder

## 0.2.0

- cleaned up internal converter functions
  - remove unused functions
- fixed seedrandom import issue

## 0.1.3

- now available as standalone bundle (iife)

## 0.1.1

- Encryption/Decryption compatible with BRS
- removed big.js

## 0.1.0-rc.3

- Encryption/Decryption of message works (not for old messages yet)
- reduced package size
  - words dictionary follows BIP39 standard
  - exchanged BN.js by big.js
