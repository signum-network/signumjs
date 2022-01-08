const {Address, AddressPrefix} = require("@signumjs/core");
const {Amount, CurrencySymbol} = require("@signumjs/util");
const inquirer = require("inquirer");
const {generateMasterKeys} = require("@signumjs/crypto");
const {provideLedger, handleError, confirmTransaction} = require('../helper');

// these are our possible networks
const LedgerHostUrls = {
    // 'TestNet': 'https://europe3.testnet.signum.network',
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
                name: 'recipient',
                message: 'Please enter the recipients Id or Address!'
            },
            {
                type: 'input',
                name: 'amount',
                message: 'Please enter the amount of Signa you wish to send!',
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
 * This example shows how to send some amount of SIGNA to another account
 */
async function sendSigna(args) {
    // All API calls are asynchronous
    // The recommended pattern is using async/await
    // This makes exception handling easy using try/catch
    try {
        const {ledgerType, recipient, amount, feeType} = args

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
        await ledger.account.getAccount({accountId: recipientId})

        // before we can send we need to get the private signing key from the user
        // In this current scenario we ask the user for his passphrase, as we can then derive the necessary key
        const {passphrase} = await confirmTransaction(args)
        const {publicKey, signPrivateKey} = generateMasterKeys(passphrase)

        // as a next step, we use the systems fee suggestion mechanism to give us the current costs for the chosen
        // fee type. In this example we let it flexible, but you can fix the fee costs to a minimum, i.e. 0,00735 SIGNA
        const suggestedFees = await ledger.network.getSuggestedFees()

        // we assume that the feeType is either ['Minimum', 'Cheap', 'Standard', 'Priority']
        const selectedFeePlanck = suggestedFees[feeType.toLowerCase()]

        // Now, we call the getAccountTransactions method,
        // but we want only the 100 most recent transactions, including multi-out
        const {transaction} = await ledger.transaction.sendAmountToSingleRecipient(
            {
                recipientId,
                amountPlanck: Amount.fromSigna(amount).getPlanck(),
                feePlanck: selectedFeePlanck,
                senderPrivateKey: signPrivateKey,
                senderPublicKey: publicKey
            }
        );

        // now, some final nice message
        const addressPrefix = ledgerType === 'MainNet' ? AddressPrefix.MainNet : AddressPrefix.TestNet
        console.info(`Successfully sent ${amount} ${CurrencySymbol} to ${Address.create(recipientId, addressPrefix).getReedSolomonAddress()} - Transaction Id: ${transaction}`)
        console.info(`You paid a total of ${Amount.fromSigna(amount).add(Amount.fromPlanck(selectedFeePlanck)).toString()}`)
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
    await sendSigna(params);
})();
