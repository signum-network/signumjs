# Change Log

## 2.0.7

### Patch Changes

- 1a64657: improved crypto randomness for word and string generators
- Updated dependencies [1a64657]
  - @signumjs/crypto@2.0.7
  - @signumjs/core@2.0.7
  - @signumjs/standards@2.0.7
  - @signumjs/util@2.0.7

## 2.0.6

### Patch Changes

- Breaking Change: renamed isAttachmentVersion to getAttachmentVersion and typed the version identifier
- Added main field in package.json to fix resolution issues
- Updated dependencies
- Updated dependencies
  - @signumjs/core@2.0.6
  - @signumjs/crypto@2.0.6
  - @signumjs/standards@2.0.6
  - @signumjs/util@2.0.6

## 2.0.5

### Patch Changes

- Uses exports in package.json and minor fixes
- Updated dependencies
  - @signumjs/standards@2.0.5
  - @signumjs/crypto@2.0.5
  - @signumjs/core@2.0.5
  - @signumjs/util@2.0.5

## 2.0.4

### Patch Changes

- [Breaking Change] CryptoProvider renamed to CryptoAdapter

  - Crypto Adapters `NodeJsCryptoAdapter` and `WebCryptoAdapter` are dedicate path `@signumjs/crypto/adapters`
  - `generateMnemonic` has changed API to better support partial settings.

- Updated dependencies
  - @signumjs/core@2.0.4
  - @signumjs/crypto@2.0.4
  - @signumjs/standards@2.0.4
  - @signumjs/util@2.0.4

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

- Updated dependencies
  - @signumjs/crypto@2.0.3
  - @signumjs/core@2.0.3
  - @signumjs/standards@2.0.3
  - @signumjs/util@2.0.3

## 2.0.2

### Patch Changes

- Crypto: Custom Crypto Provider on getInstance
- Updated dependencies
  - @signumjs/core@2.0.2
  - @signumjs/crypto@2.0.2
  - @signumjs/standards@2.0.2
  - @signumjs/util@2.0.2

## 2.0.1

### Patch Changes

- Added IIFE bundles
- Updated dependencies
  - @signumjs/core@2.0.1
  - @signumjs/crypto@2.0.1
  - @signumjs/standards@2.0.1
  - @signumjs/util@2.0.1

## 2.0.0

### Major Changes

- 14f4944: This new version uses a completely modernized stack (turborepo, vite, vitest). Furthermore, the crypto package was rewritten to remove deprecated crypto-js library and being extensible. The standards (SRC) packages were reorganized and finally the monitor package was removed

  Breaking Changes:

  1. `@signumjs/monitor` was removed, as not really used
  2. `@signumjs/crypto` was completely rewritten, mainly due to the deprecation of `crypto-js` and certain security implications
  3. `@signumjs/standards` were reorganized respecting the Signum Request for Comment (SRC) numbering

  How to update from 1.0 to 2.0

  1. Monitor was removed

  Drop `signumjs/monitor` (no replacement here) - if you used the monitor you can copy the code from the repo and include it manually in your code base

  2. Adjust Crypto

  - Passphrase generator was dropped, use `generateMnemonic` instead
  - `generateMasterKeys` was renamed to `generateSignKeys`
  - `hashSHA256` was renamed to `sha256AsHex` (and more sha256 hashers are available)
  - `encryptAES` and `decryptAES` were dropped - use native crypto methods for AES encryption. Signum uses for their P2P encryption a AES based algorithm using the shared key (`encryptMessage` and `encryptData`)

  > The new crypto package offers more secure random and sha256 functions and is much more flexible. Check the docs for more info

  3. Using SRC based standards

  Actually, not much to do here. It's just that the internal structure is organized by the SRC numbering.

### Patch Changes

- Updated dependencies [14f4944]
  - @signumjs/standards@2.0.0
  - @signumjs/crypto@2.0.0
  - @signumjs/core@2.0.0
  - @signumjs/util@2.0.0
    All notable changes to this project will be documented in this file.

# 1.0.0

- Introduced `wallets` package
