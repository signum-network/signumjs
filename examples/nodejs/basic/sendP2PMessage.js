const {Address, AddressPrefix} = require("@signumjs/core");
const inquirer = require("inquirer");
const {generateMasterKeys} = require("@signumjs/crypto");
const {provideLedger, handleError, confirmTransaction} = require('../helper');

// these are our possible networks
const LedgerHostUrls = {
    'TestNet': 'http://localhost:6876',
    'MainNet': 'https://europe.signum.network',
}

/**
 * Just a helper function to ask for the send parameters
 */
function askForParameters() {
    return inquirer
        .prompt([
            {
                type: 'list',
                name: 'ledgerType',
                choices: ['TestNet', 'MainNet'],
                message: 'Choose the network',
                default: 'TestNet',
            },
            {
                type: 'checkbox',
                name: 'mode',
                choices: [{value: 'encrypted', name: 'Encrypted'}, {value: 'plain', name: 'Plain'}],
                message: 'Select Message Mode:',
                default: 'encrypted',
            },
            {
                type: 'input',
                name: 'recipient',
                message: 'Please enter the recipients Id or Address!'
            },
            {
                type: 'input',
                name: 'message',
                message: 'Please enter a text message you wish to send!',
            },
            {
                type: 'list',
                name: 'feeType',
                choices: ['Minimum', 'Cheap', 'Standard', 'Priority'],
                message: 'Choose the fee type',
                default: 'Cheap',
            },
        ])
}

/**
 * This example shows how to send a message to another account
 */
async function sendP2PMessage(args) {
    try {
        const {ledgerType, recipient, message, feeType, mode} = args

        const encrypted = mode[0] === 'encrypted'

        // actually, the provided ledger is the Api object returned from composeApi
        const ledger = provideLedger(LedgerHostUrls[ledgerType])
        // we check if incoming account is either a Signum Address, or Numeric Id
        // eventually, we convert to Numeric Id, if the value is invalid an error will be thrown
        const recipientId = Address.create(recipient).getNumericId()

        // now we check if the account exists. If it does not exist the method throws an
        // exception and the further flow is interrupted.
        // Using exception to assert certain conditions is IMHO more robust than checking returned
        // values with if-statements. The code is much cleaner
        console.info("Verifying recipient...")
        const {publicKey: recipientPublicKey} = await ledger.account.getAccount({accountId: recipientId})

        if (!recipientPublicKey && mode.encrypted) {
            console.warn("The recipients account does not have any public key (inactive account). The message cannot be encrypted and will be sent as plain text only")
        }

        // before we can send we need to get the private signing key from the user
        // In this current scenario we ask the user for his passphrase, as we can then derive the necessary keys
        const {passphrase} = await confirmTransaction(args)
        const {publicKey, signPrivateKey, agreementPrivateKey} = generateMasterKeys(passphrase)

        // as a next step, we use the systems fee suggestion mechanism to give us the current costs for the chosen
        // fee type. In this example we let it flexible, but you can fix the fee costs to a minimum, i.e. 0,00735 SIGNA
        const suggestedFees = await ledger.network.getSuggestedFees()

        // we assume that the feeType is either ['Minimum', 'Cheap', 'Standard', 'Priority']
        const selectedFeePlanck = suggestedFees[feeType.toLowerCase()]

        // Now, we execute the transaction
        // within the method the local signing flow is being executed, i.e.
        // the private key is used only locally for signing, but never sent over the network

        let tx = null;
        if (encrypted) {
            tx = await ledger.message.sendEncryptedMessage(
                {
                    recipientId,
                    message,
                    messageIsText: true,
                    feePlanck: selectedFeePlanck,
                    senderPrivateKey: signPrivateKey,
                    senderPublicKey: publicKey,
                    // to send P2P encrypted messages,
                    // it's necessary to use our own "agreementPrivateKey" and the recipients publicKey
                    senderAgreementKey: agreementPrivateKey,
                    recipientPublicKey
                }
            );

        } else {
            tx = await ledger.message.sendMessage(
                {
                    recipientId,
                    message,
                    messageIsText: true,
                    feePlanck: selectedFeePlanck,
                    senderPrivateKey: signPrivateKey,
                    senderPublicKey: publicKey
                }
            );
        }
        // now, some final nice message
        const addressPrefix = ledgerType === 'MainNet' ? AddressPrefix.MainNet : AddressPrefix.TestNet
        console.info(`Successfully sent a message to ${Address.create(recipientId, addressPrefix).getReedSolomonAddress()} - Transaction Id: ${tx.transaction}`)
    } catch (e) {
        // If the API returns an exception,
        // the return error object is of type HttpError
        handleError(e);
    }
}

// // Our entry point has to be async, as our subsequent calls are.
// // This pattern keeps your app running until all async calls are executed
(async () => {
    const params = await askForParameters();
    await sendP2PMessage(params);
})();
