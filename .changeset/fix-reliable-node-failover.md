---
"@signumjs/util": patch
"@signumjs/core": patch
---

fix: failover via `reliableNodeHosts` works again. `asyncRetry` now returns the result of a successful retry (it resolved with `undefined` before, so requests failed with `Cannot destructure property 'response'`), and the client retries once per reliable host, so a single fallback host is enough.
