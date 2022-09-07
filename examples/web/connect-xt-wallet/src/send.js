function getRecipientAccountId() {
    let account = document.getElementById('address-field').value.trim();
    return sig$.Address.create(account).getNumericId()
}

function validateForm() {

    hideError()
    hideMessage()

    const recipientId = getRecipientAccountId()
    const message = getMessage()

    const notEmpty = s => s && s.length > 0

    const isValid = notEmpty(recipientId) && notEmpty(message) && !!window.wallet.connection
    if (isValid) {
        document
            .getElementById('send-button')
            .removeAttribute('disabled')
    } else {
        document
            .getElementById('send-button')
            .setAttribute('disabled', 'disabled')
    }
}

function calcFee() {
    const feeFactor = Math.floor((184 + getMessage().length) / 184);
    return sig$util.Amount
        .fromSigna(0.01)
        .multiply(feeFactor)
        .getPlanck()
}

async function sendMessage() {
    const recipientId = getRecipientAccountId()
    const message = getMessage()
    try {
        const {unsignedTransactionBytes} = await window.signumLedger.message.sendMessage({
            feePlanck: calcFee(),
            recipientId,
            message,
            messageIsText: true,
            senderPublicKey: window.wallet.connection.publicKey
        })
        const {transaction} = await window.wallet.confirm(unsignedTransactionBytes)
        showSuccess(`Message sent successfully - Id: ${transaction}`)
    } catch (e) {
        showError(e.message)
    }
}
