const {ChainValue} = require("@signumjs/util");
const inquirer = require("inquirer");
const {generateMasterKeys} = require("@signumjs/crypto");
const {provideLedger, handleError, confirmTransaction, LedgerHostUrls} = require('../helper');

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
                name: 'tokenId',
                message: 'Please enter the token Id'
            },
            {
                type: 'input',
                name: 'amount',
                message: 'Please enter the amount you want to mint',
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
 * This example shows how to mint tokens
 */
async function mintToken(args) {
    try {
        const {ledgerType, tokenId, amount,feeType} = args

        // actually, the provided ledger is the Api object returned from composeApi/LedgerClient
        const ledger = provideLedger(LedgerHostUrls[ledgerType])


        // before we can send we need to get the private signing key from the user
        // In this current scenario we ask the user for his passphrase, as we can then derive the necessary key
        const {passphrase} = await confirmTransaction(args)
        const {publicKey: senderPublicKey, signPrivateKey: senderPrivateKey} = generateMasterKeys(passphrase)

        // as a next step, we use the systems fee suggestion mechanism to give us the current costs for the chosen
        // fee type. In this example we let it flexible, but you can fix the fee costs to a minimum, i.e. 0,00735 SIGNA
        const suggestedFees = await ledger.network.getSuggestedFees()

        // we assume that the feeType is either ['Minimum', 'Cheap', 'Standard', 'Priority']
        const feePlanck = suggestedFees[feeType.toLowerCase()]

        // we check for the token, and get its decimals as we need it below
        console.info("Checking token...")
        const {decimals, name} = await ledger.asset.getAsset({assetId: tokenId})

        // The token quantity is being determined by the given supply and decimals. It's similar to the concept of Signa vs Planck,
        // but with dynamic decimals (0-8). The formula to calculate the quantity is: QNT = amount * (10^decimals)
        // To simplify the Devs life we can use the value object `ChainValue` which allows us to convert from and to quantity.
        // Instead of using the name Planck/Signa the name Atomic/Compound is used
        const quantity = ChainValue.create(decimals).setCompound(amount).getAtomic()

        // Now, we execute the transaction
        // within the method the local signing flow is being executed, i.e.
        // the private key is used only locally for signing, but never sent over the network
        const {transaction} = await ledger.asset.mintAsset({
            assetId: tokenId,
            quantity,
            feePlanck,
            senderPublicKey,
            senderPrivateKey
        })

        // now, some final nice message
        console.info(`Minted ${amount} new coins of Token ${name} - Transaction Id: ${transaction}`)
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
    await mintToken(params);
})();

