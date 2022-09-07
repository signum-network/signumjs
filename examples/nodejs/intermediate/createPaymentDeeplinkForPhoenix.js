const {DeeplinkableWallet} = require("@signumjs/wallets");
const {Address} = require("@signumjs/core");
const inquirer = require("inquirer");
const {handleError} = require('../helper');

/**
 * Just a helper function to ask for the send parameters
 */
function askForParameters() {
    return inquirer
        .prompt([
            {
                type: 'input',
                name: 'recipient',
                message: 'Please enter receiving account'
            },
            {
                type: 'input',
                name: 'amount',
                message: 'Please enter amount to receive'
            },
            {
                type: 'input',
                name: 'reference',
                message: 'Please enter the reference message for payment'
            }
        ])
}

/**
 * This example shows how to use the Deeplinkable Wallet to generate a deep link
 * In a browser environment it can be used to link a button with payment options and opens
 * either the installed Phoenix Desktop wallet (works not for standalone installations), or Signum Phoenix Mobile Wallet
 */
async function createPaymentLink(args) {
    try {
        const {recipient, amount, reference} = args
        // In NodeJS the wallet will only generate the link,
        // but running this code in the browser opens the deeplink
        // which opens the Phoenix wallet, if installed
        const wallet = new DeeplinkableWallet()
        const recipientId = Address.create(recipient).getNumericId()

        const result = await wallet.pay({
            amount,
            message: reference,
            to: recipientId
        })
        console.info(`Your deeplink: ${result}`)
    } catch (e) {
        handleError(e);
    }
}

// // Our entry point has to be async, as our subsequent calls are.
// // This pattern keeps your app running until all async calls are executed
(async () => {
    const params = await askForParameters();
    await createPaymentLink(params);
})();

