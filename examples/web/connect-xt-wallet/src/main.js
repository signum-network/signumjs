
function toggleConnectButton(){
    document.getElementById('connect-button').classList.toggle('hidden')
}

function updateConnectionInfo(){
    console.log('connection',window.wallet.connection)
    const {publicKey, currentNodeHost} = window.wallet.connection
    const address = sig$.Address.fromPublicKey(publicKey, 'TS').getReedSolomonAddress()
    document.getElementById('connection-info').innerText = `Connected ${address} (${currentNodeHost})`
}

function listenFormAndValidate(id) {
    document.getElementById(id).addEventListener('keyup', validateForm)
}

function listenWalletEvents(){
    window.addEventListener('wallet-event', ({detail}) => {
        switch(detail.action){
            case 'connected':
            case 'disconnected':
                toggleConnectButton();
                // fall through is intended
            default:
                updateConnectionInfo();
        }
    })
}

function init() {
    listenFormAndValidate('address-field')
    listenFormAndValidate('message-field')
    listenWalletEvents()
    connectWallet();
}
