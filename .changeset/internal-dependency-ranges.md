---
"@signumjs/contracts": patch
"@signumjs/core": patch
"@signumjs/standards": patch
"@signumjs/wallets": patch
---

fix: internal dependencies use `^` ranges instead of `*`, so upgrading a package also upgrades the `@signumjs` packages it depends on (e.g. `core` pulls the matching `util`).
