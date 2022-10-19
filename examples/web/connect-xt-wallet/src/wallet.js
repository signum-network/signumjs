
let walletListener = null;
// In vanilla JS, we can abuse the global object
// The wallet connection should be a singleton
window.wallet = new sig$wallets.GenericExtensionWallet()
window.signumLedger = null

// we need to reconstruct the ledger client to use the correct node, i.e. the one selected by
// the wallet
function createLedgerClient(nodeHost){
    window.signumLedger = sig$.LedgerClientFactory.createClient({
        nodeHost
    })
}

// for better encapsulation, it's not the worst idea to dispatch global events
function propagateWalletEvent(action, data = {}){
    window.dispatchEvent(new CustomEvent('wallet-event', {detail: {
            action,
            payload: {...data}
        }}))
}

// We need to listen to network changes...
function onNetworkChange(args) {
    propagateWalletEvent('networkChanged')
    // check if we are still within the same network
    if (args.networkName === 'Signum-TESTNET') {
        if (!window.wallet.connection) {
            connectWallet()
        } else{
            createLedgerClient(args.nodeHost)
        }
    } else {
        showError("Wallet changed to another network - Disconnect wallet")
        disconnectWallet()
    }
}

function onAccountChange(args) {
    propagateWalletEvent('accountChanged', args)
}

function onPermissionOrAccountRemoval() {
    // it's possible that the user revokes the DApps permission
    // we need to disconnect the wallet then
    propagateWalletEvent('permissionRemoved' )
    showError("Wallet removed this DApps permission")
    disconnectWallet();
}

async function connectWallet() {
    if (window.wallet.connection) return;

    try {
        // connecting the wallet is easy
        const connection = await window.wallet.connect({
            appNam: 'SignumJS XT Wallet Demo',
            networkName: 'Signum-TESTNET'
        })

        if (walletListener) {
            walletListener.unlisten();
        }

        // but we need also attach event listeners
        // this is where a bit more complexity comes into the game
        // but the XT wallet knows only four events...no rocket science here
        walletListener = connection.listen({
            onNetworkChanged: onNetworkChange,
            onAccountChanged: onAccountChange,
            onPermissionRemoved: onPermissionOrAccountRemoval,
            onAccountRemoved: onPermissionOrAccountRemoval,
        });

        createLedgerClient(connection.currentNodeHost)
        // tell everybody that we connected
        propagateWalletEvent('connected')
    } catch (e) {
        showError(e.message)
    }
}

async function disconnectWallet() {
    // when disconnecting, we should make tabula rasa and reinstantiate the wallet instance.
    window.wallet = new sig$wallets.GenericExtensionWallet();
    window.signumLedger = null;
    // DO NOT FORGET TO UNLISTEN THE LISTENERS!
    walletListener.unlisten();
    propagateWalletEvent('disconnected');
}

