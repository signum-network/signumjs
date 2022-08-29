const {Amount, ChainValue} = require("@signumjs/util");
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
                type: 'input',
                name: 'name',
                message: 'Please enter a name for the token'
            },
            {
                type: 'input',
                name: 'description',
                message: 'Please enter a brief description'
            },
            {
                type: 'checkbox',
                name: 'style',
                choices: [{value: 'mintable', name: 'Mintable'}, {value: 'fixed', name: 'Fixed Supply'}],
                message: 'Select Token Style',
                default: 'fixed',
            },
            {
                type: 'input',
                name: 'supply',
                message: 'Please enter the initial amount of tokens',
            },
            {
                type: 'input',
                name: 'decimals',
                message: 'Please enter the number of decimals',
                default: 2
            }
        ])
}

/**
 * This example shows how to issue a token
 */
async function issueToken(args) {
    try {
        const {ledgerType, name, description, supply, style, decimals} = args

        const mintable = style[0] === 'mintable'

        // actually, the provided ledger is the Api object returned from composeApi/LedgerClient
        const ledger = provideLedger(LedgerHostUrls[ledgerType])

        // before we can send we need to get the private signing key from the user
        // In this current scenario we ask the user for his passphrase, as we can then derive the necessary key
        const {passphrase} = await confirmTransaction(args)
        const {publicKey: senderPublicKey, signPrivateKey: senderPrivateKey} = generateMasterKeys(passphrase)

        // Issuing a token costs 150 SIGNA
        const feePlanck = Amount.fromSigna(150).getPlanck()

        // The token quantity is being determined by the given supply and decimals. It's similar to the concept of Signa vs Planck,
        // but with dynamic decimals (0-8). The formula to calculate the quantity is: QNT = amount * (10^decimals)
        // To simplify the Devs life we can use the value object `ChainValue` which allows us to convert from and to quantity.
        // Instead of using the name Planck/Signa the name Atomic/Compound is used
        const quantity = ChainValue.create(decimals).setCompound(supply).getAtomic()

        // Now, we execute the transaction
        // within the method the local signing flow is being executed, i.e.
        // the private key is used only locally for signinh, but never sent over the network
        const {transaction} = await ledger.asset.issueAsset({
            name,
            description,
            decimals,
            mintable,
            quantity,
            feePlanck,
            senderPublicKey,
            senderPrivateKey
        })

        // now, some final nice message
        console.info(`Token ${name} successfully created - Token Id: ${transaction}`)
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
    await issueToken(params);
})();

