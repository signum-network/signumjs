const ledger = sig$.LedgerClientFactory.createClient({nodeHost: "https://europe3.testnet.signum.network"})
document.getElementById('connected-node').textContent = ledger.service.settings.nodeHost

async function convertToAddress(event) {
    const addressKeyOrId = event.target.value;

    try {
        const address = sig$.Address.create(addressKeyOrId)
        document.getElementById('address-output-error').textContent = "";
        document.getElementById('address-output-pk').textContent = address.getPublicKey();
        document.getElementById('address-output-id').textContent = address.getNumericId();
        document.getElementById('address-output-rs').textContent = address.getReedSolomonAddress();
        if (!address.getPublicKey()) {
            document.getElementById('address-output-pk').textContent = '(loading)'
            const account = await ledger.account.getAccount({accountId: address.getNumericId()});
            document.getElementById('address-output-pk').textContent = account.publicKey;
        }
    } catch (e) {
        document.getElementById('address-output-error').textContent = e.message;
    }
}

function normalizeTwoDecimals(value, maxIn, minOut, maxOut) {
    const normalized = minOut + (value * (maxOut - minOut)) / maxIn
    return parseFloat(normalized.toFixed(2));
}

function estimateMessageFee(msg) {
    // fee is between 0.01 and 0.06 SIGNA
    // ranging from 182 bytes to max 1000 bytes
    const MaxLength = 1000
    const MinFee = 0.01
    const MaxFee = 0.06

    if (msg.length > MaxLength) {
        throw new Error(`Message too long (1000 bytes max) - got: ${msg.length}`)
    }

    const fee = normalizeTwoDecimals(msg.length, MaxLength, MinFee, MaxFee);
    return sig$util.Amount.fromSigna(fee)
}

async function sendMessage(event) {
    event.preventDefault();
    const result = document.getElementById('send-result-message')
    const sendButton = document.getElementById('send-button')
    const link = document.getElementById('transaction-sent');
    link.textContent = ""
    link.setAttribute("href", "#")
    link.setAttribute("hidden", "hidden")
    try {
        result.textContent = `Sending...`
        sendButton.setAttribute('disabled', 'disabled')
        const recipient = document.getElementById('send-message-recipient-input').value
        const message = document.getElementById('send-message-text-input').value
        const mnemonic = document.getElementById('send-message-sender-mnemonic').value
        // convert address to numeric Id
        const recipientAddress = sig$.Address.create(recipient)
        const recipientId = recipientAddress.getNumericId()
        // get fee according to message length
        const feePlanck = estimateMessageFee(mnemonic).getPlanck();

        // generate signing key from mnemonic
        // signumjs never sends any passphrase over the wire, but signs locally
        // therefore signPrivateKey and publicKey is required
        const {signPrivateKey: senderPrivateKey, publicKey: senderPublicKey } = sig$crypto.generateSignKeys(mnemonic);

        // send
        // the sending method never submits
        const response = await ledger.message.sendMessage({
            message,
            messageIsText: true,
            feePlanck,
            recipientId,
            senderPrivateKey, // both keys needed for local signing
            senderPublicKey // both keys needed for local signing
        });

        result.textContent = `Sent successfully - Tx Id:  ${response.transaction}`
        const link = document.getElementById('transaction-sent');
        link.textContent = "Click to see in Explorer"
        link.setAttribute("href", `https://t-chain.signum.network/tx/${response.transaction}`)
        link.removeAttribute("hidden")
    } catch (e) {
        result.textContent = `Sending failed: ${e.message}`
    } finally {
        sendButton.removeAttribute('disabled')
    }
}


(() => {
    document.getElementById('send-message-form').addEventListener('submit', sendMessage);
})()