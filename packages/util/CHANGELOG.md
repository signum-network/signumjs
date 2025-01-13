# Change Log

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
- Modernized Build Pipeline (NodeJS 20, ESBuild, Vitest)

### Breaking changes

- Rebranding
- Removed all deprecated functions
- Renamed Functions and classes
  - `BurstValue` is `Amount` now
  - `BurstTime` is `ChainTime` now
- New Methods/Classes
  - `asyncRetry`
  - `chainValue`, a generic version of `Amount`

---

> Before Rebranding

## 0.6.0

- `BurstValue.clone()` added
- `BurstValue.fromPlanck()` accepts number now
- Added hex <> base36 conversion

### Improved

- `parseDeeplink`, `createDeeplink`
  - made domain optional
  - builtin decoding of payload

## 0.5.0

### Added

- New `BurstTime` value object class
  - facilitates usage of Burst Timestamps
- New `BurstValue` value object class
  - facilitates usage of BURST/Planck
  - increased numeric precision
- New `createDeeplink` and `parseDeeplink` methods
  - CIP22 implementation
- Added Base64 conversion (URI and UTF-8 compatible)
  - `convertStringToBase64String`
  - `convertBase64StringToString`
- Added Decimal to Hex conversion (Two's Complement support)
  - `convertDecStringToHexString`
- New Symbols for BURST (Ƀ) and Planck (ƀ)
  - `BurstSymbol`
  - `BurstPlanckSymbol`

### Deprecated

- `convertBurstTimeToDate` and `convertDateToBurstTime`
  - Use `BurstTime` instead
- `convertNumberToNQTString`, `convertNQTStringToNumber`, and `sumNQTStringToNumber`
  - Use `BurstValue` instead

## 0.4.0

- Changed License: From GPL-3.0 to Apache 2.0

## 0.2.0

- added several conversion functions
  - namely byteArray x string x hex
  - `convertHexStringtoDecString`

## 0.1.3

- now available as standalone bundle (iife)
- patched `sumNQTStringToNumber` to be accessible

## 0.1.2

- added `sumNQTStringToNumber`

## 0.1.0-rc.3

- Timestamp conversion functions

## 0.0.13 (2019-02-03)

### Added

- Added `@signumjs/utils` library for common utils.

### Changed

- Removed BurstUtils from `@signumjs/core`.
