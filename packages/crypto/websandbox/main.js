const crypto = sig$crypto;
function generateMnemonicAndKeys(){
    const mnemonic = crypto.generateMnemonic();
    document.getElementById('mnemonic-output').textContent = mnemonic;
    const keys = crypto.generateSignKeys(mnemonic);
    document.getElementById('pubkey-output').textContent = keys.publicKey;
    document.getElementById('signkey-output').textContent = keys.signPrivateKey;
    document.getElementById('agreekey-output').textContent = keys.agreementPrivateKey;
    document.getElementById('accountid-output').textContent = crypto.getAccountIdFromPublicKey(keys.publicKey);
}

function generateSHA256(event) {
    const text = event.target.value;
    let hash = '[HASH APPEARS HERE]' 
    if(text.length > 0){
        hash = crypto.sha256AsHex(text);
    }
    document.getElementById('hash-output').textContent = hash;
}

async function encrypt() {
    const secret1 = document.getElementById('encrypt-secret1-input').value
    const secret2 = document.getElementById('encrypt-secret2-input').value
    const plaintext = document.getElementById('encrypt-text-input').value

    const senderKeys = crypto.generateSignKeys(secret1);
    const recipientKeys = crypto.generateSignKeys(secret2);

    console.log("Sender Public Key", senderKeys.publicKey);
    console.log("Recipient Public Key", recipientKeys.publicKey);
    
    const ciphertextJson = await crypto.encryptMessage(plaintext, recipientKeys.publicKey, senderKeys.agreementPrivateKey);
    const ciphertext = JSON.stringify(ciphertextJson, null, "   ")
    document.getElementById('encrypt-cipher-output').textContent = ciphertext 
    document.getElementById('encrypt-copy-btn').classList.remove('hidden') 
    
    document.getElementById('decrypt-secret1-input').value = secret1
    document.getElementById('decrypt-secret2-input').value = secret2
    document.getElementById('decrypt-cipher-textarea').textContent = ciphertext

}


async function decrypt() {
    const secret1 = document.getElementById('decrypt-secret1-input').value
    const secret2 = document.getElementById('decrypt-secret2-input').value
    const cipher = document.getElementById('decrypt-cipher-textarea').textContent

    const senderKeys = crypto.generateSignKeys(secret1);
    const recipientKeys = crypto.generateSignKeys(secret2);

    console.log("Sender Public Key", senderKeys.publicKey);
    console.log("Recipient Public Key", recipientKeys.publicKey);
    try {

        const plaintext = await crypto.decryptMessage(JSON.parse(cipher), senderKeys.publicKey, recipientKeys.agreementPrivateKey)
        document.getElementById('decrypt-plaintext-output').textContent = plaintext;
    }catch (error) {

    }
}

async function copyToClipboard(elementId) {
    const element = document.getElementById(elementId)
    await navigator.clipboard.writeText(element.textContent)
}

(() => {
    generateMnemonicAndKeys();
})()