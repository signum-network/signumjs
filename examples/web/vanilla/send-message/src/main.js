function getRecipientAccountId() {
    let account = document.getElementById('address-field').value.trim();
    return sig$.Address.create(account).getNumericId()
}

function getPassphrase() {
    return document.getElementById('passphrase-field').value.trim();
}

function getMessage() {
    return document.getElementById('message-field').value.trim();
}

function hideMessage() {
    document.getElementById('success-message').setAttribute('hidden', '');
}

function hideError() {
    document.getElementById('error-message').setAttribute('hidden', '');
}

function showError(message) {
    const errorMessage = document.getElementById('error-message')
    errorMessage.textContent = message;
    errorMessage.removeAttribute('hidden');
    setTimeout(hideError, 5000)
}

function showSuccess(message) {
    const successMessage = document.getElementById('success-message')
    successMessage.textContent = message;
    successMessage.removeAttribute('hidden');
    setTimeout(hideMessage, 5000)
}


function validateForm() {

    hideError()
    hideMessage()

    const recipientId = getRecipientAccountId()
    const passphrase = getPassphrase()
    const message = getMessage()

    const notEmpty = s => s && s.length > 0

    const isValid = notEmpty(recipientId) && notEmpty(passphrase) && notEmpty(message)
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
    // TODO: still need the fee calculation regime in our signumjs code
    // this calculation should not be delegated to users
    const feeFactor = Math.floor((176 + getMessage().length) / 176);
    return sig$util.Amount
        .fromPlanck(sig$util.FeeQuantPlanck)
        .multiply(feeFactor)
        .getPlanck()
}

async function sendMessage() {
    const recipientId = getRecipientAccountId()
    const passphrase = getPassphrase()
    const message = getMessage()

    // We need to generated the keys from the passphrase now
    const keys = sig$crypto.generateMasterKeys(passphrase)

    const params = {
        feePlanck: calcFee(),
        recipientId,
        message,
        messageIsText: true,
        senderPrivateKey: keys.signPrivateKey,
        senderPublicKey: keys.publicKey
    }

    try {
        await window.SignumApi.message.sendMessage(params)
        showSuccess('Message sent successfully')
    } catch (e) {
        showError(e.message)
    }
}

function updateNetwork(newNodeHost) {
    window.SignumApi = sig$.composeApi({
        nodeHost: newNodeHost
    });
}

function listenAndValidate(id) {
    document.getElementById(id).addEventListener('keyup', validateForm)
}

function main() {

    const networkSelector = document.getElementById('network-selector');
    networkSelector.addEventListener('change', e => {
        updateNetwork(e.target.value)
    });

    listenAndValidate('passphrase-field')
    listenAndValidate('address-field')
    listenAndValidate('message-field')

    // Attaching as global object is a nice way to access the Api instance all over over the app
    window.SignumApi = sig$.composeApi({
        nodeHost: networkSelector.value
    });

}
