const {Amount, ChainValue} = require("@signumjs/util");
const inquirer = require("inquirer");
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
            }
        ])
}

/**
 * This example shows how to call an endpoint that is not supported (yet) by the SDK
 * SignumJS uses a leaky abstraction, such it is always possible to call all existing Node Endpoints,
 * even if SignumJS does not abstract/support it directly
 */
async function callUnsupportedEndpoint(args) {
    try {
        const {ledgerType} = args

        // actually, the provided ledger is the Api object returned from composeApi/LedgerClient
        const ledger = provideLedger(LedgerHostUrls[ledgerType])

        // Now, let's assume that the method `getBlocks` would not be supported by SignumJS
        // see here: https://europe3.testnet.signum.network/api-doc/index.html#get-/api-requestType-getBlocks
        //
        // The `service` object gives us access to some additional methods, where `query` is our HTTP GET, and `send` HTTP POST
        // Both methods transform the json arguments into the correct query string for the Node API
        const result = await ledger.service.query('getBlocks', {
            firstIndex: 0,
            lastIndex: 3,
            includeTransactions: false
        })
        result.blocks.forEach(console.log)
    } catch (e) {
        // If the API returns an exception,
        // the return error object is of type HttpError
        handleError(e);
    }
}

(async () => {
    const params = await askForParameters();
    await callUnsupportedEndpoint(params);
})();
