---
"@signumjs/core": patch
---

fix: `sendEncryptedMessage` no longer rejects messages client-side. The removed check compared the length of the hex-encoded ciphertext against 1024, which limited encrypted messages to 512 bytes although the node accepts up to `maxArbitraryMessageLength` (1000 bytes). The node now enforces the limit and returns `Max encrypted message length exceeded`.
