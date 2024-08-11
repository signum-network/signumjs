const crypto = sig$crypto;
async function generateMnemonicAndKeys(){
    const mnemonic = await crypto.generateMnemonic();
    document.getElementById('mnemonic-output').textContent = mnemonic;
    const keys = await crypto.generateSignKeys(mnemonic);
    document.getElementById('pubkey-output').textContent = keys.publicKey;
    document.getElementById('signkey-output').textContent = keys.signPrivateKey;
    document.getElementById('agreekey-output').textContent = keys.agreementPrivateKey;
    document.getElementById('accountid-output').textContent = await crypto.getAccountIdFromPublicKey(keys.publicKey);
}

async function generateSHA256(event) {
    const text = event.target.value;
    let hash = '[HASH APPEARS HERE]' 
    if(text.length > 0){
        hash = await crypto.sha256AsHex(text);
    }
    document.getElementById('hash-output').textContent = hash;
}

(() => {
    generateMnemonicAndKeys();
})()