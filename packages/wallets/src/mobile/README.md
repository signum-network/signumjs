# MobileWallet

Integration with Signum mobile wallets via deep linking (SIP22 protocol).

## Features

- Direct deeplink integration (`signum://` protocol)
- Simple callback-based communication
- Persistent connection management via `MobileConnection`
- Pluggable storage (defaults to `localStorage`, swap for React Native, etc.)
- No polling or complex async flows

## Basic Usage

### 1. Create a MobileWallet instance

```typescript
import { MobileWallet, MobileConnection } from '@signumjs/wallets';

const wallet = new MobileWallet();
```

### 2. Connect to get public key

```typescript
// Opens mobile wallet with connect deeplink
wallet.connect({
    callbackUrl: `${window.location.origin}/wallet-connected`,
    appName: 'MyDApp',
    network: 'mainnet'
});

// Mobile wallet will redirect to: /wallet-connected?publicKey=abc123...&status=success
```

### 3. Handle connect callback

On your callback page, parse the response and persist the connection:

```typescript
import { MobileWallet, MobileConnection } from '@signumjs/wallets';

// Parse and persist in one step
const data = MobileWallet.parseConnectCallback();
MobileConnection.save(data);

// Redirect back to app
window.location.href = '/';
```

### 4. Sign transactions

```typescript
import { MobileConnection } from '@signumjs/wallets';

// Check connection and get public key
if (MobileConnection.isConnected()) {
    const publicKey = MobileConnection.getPublicKey();

    // Create unsigned transaction using the public key
    const unsignedTx = await ledger.transaction.sendAmountToSingleRecipient({
        senderPublicKey: publicKey,
        recipientId: recipientAddress,
        amountPlanck: amount,
        feePlanck: fee,
    });

    // Open mobile wallet to sign
    wallet.sign({
        unsignedTransactionBytes: unsignedTx.unsignedTransactionBytes,
        callbackUrl: `${window.location.origin}/wallet-signed`,
        network: 'mainnet'
    });
}
```

### 5. Handle signing response

```typescript
import { MobileWallet } from '@signumjs/wallets';

const data = MobileWallet.parseSignCallback();

if (data.status === 'success') {
    console.log('Transaction ID:', data.transactionId);
} else if (data.status === 'rejected') {
    console.log('User cancelled');
} else if (data.status === 'failed') {
    console.log('Transaction failed');
}
```

## MobileConnection

`MobileConnection` manages persistence of the wallet connection across page navigations. Since mobile wallet interaction happens via deep link redirects, the `MobileWallet` instance doesn't survive page transitions. `MobileConnection` solves this.

### API

#### `MobileConnection.save(data: ConnectCallbackData): void`

Persists the public key from the connect callback.

#### `MobileConnection.isConnected(): boolean`

Returns `true` if a public key is stored.

#### `MobileConnection.getPublicKey(): string | null`

Returns the stored public key, or `null` if not connected.

#### `MobileConnection.disconnect(): void`

Clears the stored connection data.

#### `MobileConnection.useStorage(storage: MobileConnectionStorage): void`

Sets a custom storage backend. Defaults to `localStorage`.

```typescript
// Example: React Native with AsyncStorage adapter
const asyncStorageAdapter = {
    getItem: (key) => AsyncStorage.getItemSync(key),
    setItem: (key, value) => AsyncStorage.setItemSync(key, value),
    removeItem: (key) => AsyncStorage.removeItemSync(key),
};

MobileConnection.useStorage(asyncStorageAdapter);
```

## MobileWallet API Reference

### `connect(args: MobileWalletConnectArgs): string`

Opens the mobile wallet to request connection and public key.

**Parameters:**
- `callbackUrl` - URL the mobile wallet should redirect to after connection
- `appName` - Name of the dApp
- `network` - `'mainnet'` or `'testnet'`

**Returns:** The deeplink URL

**Callback format:** `callbackUrl?publicKey=abc123...&status=success`

---

### `sign(args: MobileWalletSignArgs): string`

Opens the mobile wallet to sign an unsigned transaction.

**Parameters:**
- `unsignedTransactionBytes` - The unsigned transaction bytes to sign
- `callbackUrl` - URL the mobile wallet should redirect to after signing
- `network` - `'mainnet'` or `'testnet'`

**Returns:** The deeplink URL

**Callback formats:**
- Success: `callbackUrl?status=success&transactionId=xyz789`
- Rejected: `callbackUrl?status=rejected`
- Failed: `callbackUrl?status=failed`

---

### `static parseConnectCallback(): ConnectCallbackData`

Parses the connect callback URL parameters. Returns `{ publicKey, status }`.

**Throws:** `MobileWalletError` if required parameters are missing or invalid.

---

### `static parseSignCallback(): SignCallbackData`

Parses the sign callback URL parameters. Returns `{ status, transactionId? }`.

**Throws:** `MobileWalletError` if required parameters are missing or invalid.
