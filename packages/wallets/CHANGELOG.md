# Change Log

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
