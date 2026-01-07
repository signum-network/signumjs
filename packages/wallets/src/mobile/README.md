# MobileWallet

Integration with Signum mobile wallets via deep linking (SIP22 protocol).

## Features

- Direct deeplink integration (`signum://` protocol)
- Simple callback-based communication
- No polling or complex async flows
- Full developer control over state management

## Basic Usage

### 1. Create a MobileWallet instance

```typescript
import { MobileWallet } from '@signumjs/wallets';

const wallet = new MobileWallet();
```

### 2. Connect to get public key

```typescript
// Opens mobile wallet with connect deeplink
const callbackUrl = `${window.location.origin}/wallet-connected.html`;
wallet.connect(callbackUrl);

// Mobile wallet will redirect to: /wallet-connected.html?publicKey=abc123...
```

### 3. Create callback page

Create `/wallet-connected.html`:

```html
<!DOCTYPE html>
<html>
<body>
    <script type="module">
        import { MobileWallet } from '@signumjs/wallets';

        // Parse callback data
        const data = MobileWallet.parseCallback();

        if (data.publicKey) {
            // Store public key
            localStorage.setItem('signum-wallet-publicKey', data.publicKey);

            // Redirect back to app
            window.location.href = '/';
        }
    </script>
</body>
</html>
```

### 4. Sign transactions

```typescript
import { createClient } from '@signumjs/core/createClient';

// Get stored public key
const publicKey = wallet.getPublicKey('signum-wallet-publicKey');

// Create unsigned transaction
const ledger = createClient({
    nodeHost: "https://brazil.signum.network"
});

const unsignedTx = await ledger.transaction.sendAmountToSingleRecipient({
    senderPublicKey: publicKey,
    recipientId: recipientAddress,
    amountPlanck: amount
});

// Open mobile wallet to sign
const callbackUrl = `${window.location.origin}/wallet-signed.html`;
wallet.sign(unsignedTx.unsignedTransactionBytes, callbackUrl);

// Mobile wallet will redirect to: /wallet-signed.html?status=success&transactionId=xyz789
```

### 5. Handle signing response

Create `/wallet-signed.html`:

```html
<!DOCTYPE html>
<html>
<body>
    <script type="module">
        import { MobileWallet } from '@signumjs/wallets';

        const data = MobileWallet.parseCallback();

        if (data.status === 'success' && data.transactionId) {
            // Transaction successful
            console.log('Transaction ID:', data.transactionId);
            localStorage.setItem('last-tx-id', data.transactionId);
            window.location.href = '/';

        } else if (data.status === 'rejected') {
            // User cancelled
            alert('Transaction cancelled');
            window.location.href = '/';

        } else if (data.status === 'failed') {
            // Transaction failed
            alert('Transaction failed');
            window.location.href = '/';
        }
    </script>
</body>
</html>
```

## API Reference

### `connect(callbackUrl: string): string`

Opens the mobile wallet to request connection and public key.

**Parameters:**
- `callbackUrl` - URL the mobile wallet should redirect to after connection

**Returns:** The deeplink URL (for testing or custom handling)

**Callback format:** `callbackUrl?publicKey=abc123...`

---

### `getPublicKey(storageKey?: string): string`

Retrieves the public key from localStorage.

**Parameters:**
- `storageKey` - localStorage key (default: `'signum-wallet-publicKey'`)

**Returns:** The public key string

**Throws:** Error if public key not found

---

### `sign(unsignedTransactionBytes: string, callbackUrl: string): string`

Opens the mobile wallet to sign an unsigned transaction.

**Parameters:**
- `unsignedTransactionBytes` - The unsigned transaction bytes to sign
- `callbackUrl` - URL the mobile wallet should redirect to after signing

**Returns:** The deeplink URL (for testing or custom handling)

**Callback formats:**
- Success: `callbackUrl?status=success&transactionId=xyz789`
- Rejected: `callbackUrl?status=rejected`
- Failed: `callbackUrl?status=failed`

---

### `static parseCallback(): CallbackData`

Static helper to parse callback data from URL parameters.

**Returns:** Object with optional properties:
```typescript
{
    publicKey?: string;
    status?: string;
    transactionId?: string;
}
```

## Design Philosophy

The MobileWallet is intentionally **low-level and unopinionated**:

- **No polling** - Direct callback-based communication
- **No promises** - Developer controls async flow
- **No state management** - Developer chooses localStorage, React state, etc.
- **No assumptions** - Works with any framework or vanilla JS

This gives you maximum flexibility to integrate the wallet into your specific dApp architecture.

## Examples

See the example files:
- `test.html` - Complete working example
- `wallet-connected.html` - Connect callback example
- `wallet-signed.html` - Sign callback example
