
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
