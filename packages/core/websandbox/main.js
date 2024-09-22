
const ledger = sig$.LedgerClientFactory.createClient({ nodeHost: "https://europe3.testnet.signum.network"})

async function convertToAddress(event) {
    const addressKeyOrId =event.target.value;

    try{
        const address = sig$.Address.create(addressKeyOrId)
        document.getElementById('address-output-error').textContent = "";
        document.getElementById('address-output-pk').textContent = address.getPublicKey();
        document.getElementById('address-output-id').textContent = address.getNumericId();
        document.getElementById('address-output-rs').textContent = address.getReedSolomonAddress();
        if(!address.getPublicKey()){
            document.getElementById('address-output-pk').textContent = '(loading)'
            const account = await ledger.account.getAccount({accountId: address.getNumericId() });
            document.getElementById('address-output-pk').textContent = account.publicKey;
        }
    }catch(e){
        document.getElementById('address-output-error').textContent = e.message;
    }
}
