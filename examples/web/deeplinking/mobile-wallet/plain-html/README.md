# Demo dApp - Signum Mobile Wallet Deep Link Testing

This is a simple demo web application to test the Signum Mobile Wallet deep link integration.

## Features

✅ **Connect Wallet** - Test the `connect` action (get user's public key)
✅ **Send Transaction** - Test the `sign` action (sign transactions)
✅ **Network Switching** - Test on both Testnet and Mainnet
✅ **Activity Log** - See all events and deep links generated
✅ **No Build Required** - Pure HTML/JavaScript using SignumJS CDN

## Quick Start

### Option 1: Vite Dev Server (Recommended ✅)

**Best for development - Hot reload, proper CORS, network access**

```bash
npm install
npm run dev
```

Then open:
- **Local:** http://localhost:5173
- **Network:** http://YOUR_IP:5173 (shown in terminal)

Vite will automatically show your network IP addresses!

## How to Test

### Prerequisites

- Install ngrok (Reverse Proxy) on your local machine: https://ngrok.com/docs/getting-started
- Mobile Wallet running (On phone or emulator)

### Testing on Mobile Device 

1. **Start Vite server:**
   ```bash
   npm run start
   ```

2. **Start ngrok (Reverse Proxy)**

Run ngrok in a separate terminal window (pointing to vite's port 4173)

```bash
ngrok http 5173
```

3. **Open Demo dApp:**
   - Open mobile browser (Safari/Chrome)
   - Navigate to ngrok URL (shown in terminal)
   - Example: `http://12345678.ngrok.io`

    
4. **Test the flow:**
   - Click "Connect Wallet"
   - Wallet app opens
   - Approve connection
   - Returns to demo dApp
   - Click "Send Transaction"
   - Wallet opens to sign screen
   - Sign and broadcast
   - Returns to demo dApp with transaction ID

