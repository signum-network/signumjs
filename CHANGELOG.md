# Change Log

## 2.0.8

### Patch Changes

- 8176d1c: Bringing comments back to compiled packages - they were accidentally omitted on compilation
- Updated dependencies [8176d1c]
  - @signumjs/contracts@2.0.8
  - @signumjs/crypto@2.0.8
  - @signumjs/http@2.0.8
  - @signumjs/util@2.0.8

## 2.0.7

### Patch Changes

- 1a64657: improved crypto randomness for word and string generators
- Updated dependencies [1a64657]
  - @signumjs/crypto@2.0.7
  - @signumjs/contracts@2.0.7
  - @signumjs/http@2.0.7
  - @signumjs/util@2.0.7

## 2.0.6

### Patch Changes

- Breaking Change: renamed isAttachmentVersion to getAttachmentVersion and typed the version identifier
- Added main field in package.json to fix resolution issues
- Updated dependencies
- Updated dependencies
  - @signumjs/contracts@2.0.6
  - @signumjs/crypto@2.0.6
  - @signumjs/http@2.0.6
  - @signumjs/util@2.0.6

## 2.0.5

### Patch Changes

- Uses exports in package.json and minor fixes
- Updated dependencies
  - @signumjs/contracts@2.0.5
  - @signumjs/crypto@2.0.5
  - @signumjs/http@2.0.5
  - @signumjs/util@2.0.5

## 2.0.4

### Patch Changes

- [Breaking Change] CryptoProvider renamed to CryptoAdapter

  - Crypto Adapters `NodeJsCryptoAdapter` and `WebCryptoAdapter` are dedicate path `@signumjs/crypto/adapters`
  - `generateMnemonic` has changed API to better support partial settings.

- Updated dependencies
  - @signumjs/contracts@2.0.4
  - @signumjs/crypto@2.0.4
  - @signumjs/http@2.0.4
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
  - @signumjs/contracts@2.0.3
  - @signumjs/http@2.0.3
  - @signumjs/util@2.0.3

## 2.0.2

### Patch Changes

- Crypto: Custom Crypto Provider on getInstance
- Updated dependencies
  - @signumjs/contracts@2.0.2
  - @signumjs/crypto@2.0.2
  - @signumjs/http@2.0.2
  - @signumjs/util@2.0.2

## 2.0.1

### Patch Changes

- Added IIFE bundles
- Updated dependencies
  - @signumjs/contracts@2.0.1
  - @signumjs/crypto@2.0.1
  - @signumjs/http@2.0.1
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
  - @signumjs/contracts@2.0.0
  - @signumjs/crypto@2.0.0
  - @signumjs/http@2.0.0
  - @signumjs/util@2.0.0
    All notable changes to this project will be documented in this file.

## 1.0.0 (TBR)

This version is a major breakthrough with a lots of significant and breaking changes.

- Rebranding
- Removed all deprecated functions
- Several Renamed Functions and classes
- Improved consistency of functions
- Improved documentation
- Added support for external signing, i.e. using no public key return unsigned tx bytes
  - Attention: `sendEncryptedMessage` changed its interface
  - Attention: `getAliases` changed its interface and moved to Alias API
  - Attention: `getAllAssets` changed its interface
- Multiouts with duplicate id checks now, i.e. automatic dedupe for same multiout
- Support for Contract References aka Carbon Contracts/Green Smart Contracts
- New Functions/Classes:

  - `getMiningInfo`
  - `publishContractByReference`
  - `getNetworkInfo`
  - `LedgerClientFactory`
  - `getAssetHolders`
  - `getAssetHoldersPerAccount`
  - `getAssetHoldersPerAsset`
  - `addAssetTreasuryAccount`
  - `distributeToTokenHolders`
  - `getAllTrades`
  - `getAssetTrades`
  - `getAssetTradesPerAccount`
  - `getAssetTradesPerAsset`
  - `getAliasesOnSale`
  - `sellAlias`
  - `buyAlias`
  - `mintAsset`
  - `burnAsset`
  - `getOpenBidOrders`
  - `getOpenAskOrders`
  - `getOpenBidOrdersPerAccount`
  - `getOpenAskOrdersPerAccount`
  - `getOpenBidOrdersPerAsset`
  - `getOpenAskOrdersPerAsset`
  - `getTradeHistoryPerAccount`
  - `transferAssetOwnership`,
  - `getTransactionByReferenceHash`
  - `calculateDistributionFee`,
  - `getAssetsByOwner`,
  - `searchAliasesByName`,
  - `getTopLevelDomains`
  - `buyTopLevelDomain`
  - `getContractsByMachineCodeHash`

- New Transaction Subtype Enums for Assets
- `getAccountTransactions` can resolve asset distributions now!
- Account class converted to interface and follows now the Nodes response
- Minor bug fixes

---

> Before Rebranding

## 0.6.0

**Breaking Changes**

- `getAccount` accepts an argument object now
- `TransactionRewardRecipentSubtype` renamed to `TransactionMiningSubtype`
- `setAccountInfo` accepts an argument object now

---

**New**

- Added `BurstService.selectBestNode`
- deprecated `suggestFee`
  - use `getSuggestedFees`
- added new methods to transaction Api
  - `signAndBroadcastTransaction`
- added new methods to assets Api
  - `issueAsset`
  - `cancelAskOrder`
  - `cancelBidOrder`
  - `placeAskOrder`
  - `placeBidOrder`
  - `transferAsset`
- Added BurstAddress Value Object
- Added `addCommitment`, `removeCommitment`
- `Api` interface "leaks" the underlying BRS service instance

---

**Fixes**

- Fixed return types of Block Api (`BlockIdList` and `BlockList`)
- Fixed `getAccountBlocks` and `getAccountBlockIds`
- Fixed missing export for `AssetList`

---

## 0.5.0

---

**Breaking Changes**

- `ContractHelper`, `getContractDatablock` moved into new package `contracts`
- `FeeQuantNQT`removed
  - moved to `FeeQuantPlanck` in `@signumjs/util`
- `setRewardRecipient` with argument object now

---

- added new methods to contract Api

  - `callContractMethod`
  - `publishContract`

- added new methods to transaction Api

  - `createSubscription`
  - `cancelSubscription`
  - `getSubscription`
  - `getUnconfirmedTransactions`

- added new methods to account Api
  - `getAccountSubscriptions`
  - `getSubscriptionsToAccount`
  - `getRewardRecipient`

## 0.4.3

---

**Breaking Changes**

- `getAccountTransactions` uses an argument object now

---

- deprecated `sendTextMessage`
  - will be removed in next version (0.5)
  - use `sendMessage`
- deprecated `sendEncryptedTextMessage`
  - will be removed in next version (0.5)
  - use `sendEncryptedMessage`

## 0.4.1

- Initiated work on assets Api
  - added `getAsset`
  - added `getAllAssets`
- Fixed encoding issue on BRS requests (#826)
- Added `getAllContractIds` to contract Api
- Added Http Options for `BurstService`/`composeApi`

## 0.4.0

- Changed License: From GPL-3.0 to Apache 2.0
- `isAttachmentVersion` returns `true` or `false` consistently
- added `sendAmountToSingleRecipient` using new argument objects
  - allows sending with public key, to enable recipients account activation
- removed `sendMoneyMultiOut`
  - use `sendSameAmountToMultipleRecipients`
  - use `sendAmountToMultipleRecipients`
- removed `sendMoney`
  - use `sendAmount`, or better `sendAmountToSingleRecipient`
- deprecated `sendAmount`
  - will be removed in next major version (0.5)
  - use `sendAmountToSingleRecipient`

## 0.3.0

---

**Breaking Changes**

- removed `assertAttachmentVersion`
  - use `isAttachmentVersion` instead
- deprecated `sendMoneyMultiOut`
  - will be removed in next major version (0.4)
  - use `sendSameAmountToMultipleRecipients`
  - use `sendAmountToMultipleRecipients`
- deprecated `sendMoney`
  - will be removed in next major version (0.4)
  - use `sendAmount`

---

- added `isAttachmentVersion`
- added `getAttachmentVersion`
- splitted `sendMoneyMultiOut` into
  - `sendSameAmountToMultipleRecipients`
  - `sendAmountToMultipleRecipients`
- added `sendAmount`
- minor refactoring leading to slightly smaller code

## 0.2.1

- fixed missing contract imports
- adjusted error response for inconsistent BRS error responses

## 0.2.0

- introduced first Contract API functions
  - `getContract`
  - `getContractsByAccount`
- `ContractHelper` class for easier contract inspection
- fixed symlink bundling issue

## 0.1.3

- now available as standalone bundle (iife)

## 0.1.2

- added `confirmed` property to `Account` model
- added `alias` api
- added `setRewardRecipient` for assigning reward recipients for miners

## 0.1.1

- added FeeQuant for `suggestFees`

## 0.1.0

- changed BurstService creation parameter
- added sendEncryptedTextMessage
- Export of Api Interface Types
- Entirely removed BigNumber

## 0.1.0-rc.3

### General

- BRS exceptions thrown as `HttpError` now

### Account

- Modified `Account` type to better reflect what is returned from BRS API. This is a breaking change, please see the `Account` for the new property names.
- Added `setAccountInfo` for setting account name and description

### Block

- Added `getBlocks`

## 0.1.0-rc1

### Network

- Added `suggestFees` for getting suggested fees.
- Added `sendMoney` for generating the unsigned transaction, signing it, and broadcasting it.

### Account

- Added `getAliases` to retrieve aliases for an account
- Added `generateSendTransactionQRCode` and `generateSendTransactionQRCodeAddress` methods for generating a QR code image or URL, respectively.
