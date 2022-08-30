const inquirer = require("inquirer");
const {Address} = require("@signumjs/core");
const {generateMasterKeys} = require("@signumjs/crypto");
const {Amount, FeeQuantPlanck} = require("@signumjs/util");
const {provideLedger, handleError, confirmTransaction} = require('../../helper');

const LedgerHostUrls = {
    'TestNet': 'https://europe3.testnet.signum.network',
    'MainNet': 'https://europe.signum.network',
}

/**
 * This is an example of mapping between the hashes (generated on compilation with Blocktalk)
 * and more readable names. Of course, this depends on each contract
 *
 * Using constants is a good practice.
 */
const ContractMethods = {
    TransferRoyalties: '7174296962751784077',
    Transfer: '-8011735560658290665',
    PutForAuction: '4465321042251021641',
    SetNotForSale: '-1462395320800038545',
    PutForSale: '483064598096680683',
}

/**
 * Just a helper function to ask for the account id/address
 */
function askForCallingParameters() {
    return inquirer
        .prompt([
            {
                type: 'list',
                name: 'ledger',
                choices: ['TestNet', 'MainNet'],
                default: 'TestNet',
            },
            {
                type: 'input',
                name: 'contract',
                message: 'Please enter the Nfts Id or Address?'
            },
            {
                type: 'list',
                name: 'method',
                message: 'Please choose the method to call?',
                choices: Object.keys(ContractMethods),
            },
            {
                type: 'input',
                name: 'arg1',
                message: 'Please enter 1st argument (enter to skip)',
                default: null
            },
            {
                type: 'input',
                name: 'arg2',
                message: 'Please enter 2nd argument (enter to skip)',
                default: null
            },
            {
                type: 'input',
                name: 'arg3',
                message: 'Please enter 3nd argument (enter to skip)',
                default: null
            },
            {
                type: 'input',
                name: 'amount',
                message: 'Please enter the amount in Signa to send',
                default: 1
            },
        ])
}



/**
 * This advanced example shows how to interact with smart contracts, i.e. how to call methods
 */
async function callMethodOfContract(params) {
    try {

        const {ledger: ledgerChoice, contract, amount, method, arg1, arg2, arg3} = params;

        // here we instantiate the ledger api
        const ledger = provideLedger(LedgerHostUrls[ledgerChoice])

        // this way we not only convert the contracts address to its id, but this method also asserts
        // that we have a formally valid address. It's not guaranteed that the address really exists in the chain
        const contractId = Address.create(contract).getNumericId()

        // asking for the passphrase
        const {passphrase} = await confirmTransaction(params);

        const senderKeys = generateMasterKeys(passphrase);
        const args = {
            contractId,
            amountPlanck: Amount.fromSigna(amount).getPlanck(),
            senderPublicKey: senderKeys.publicKey,
            senderPrivateKey: senderKeys.signPrivateKey,
            feePlanck: "" + FeeQuantPlanck,
            methodHash: ContractMethods[method],
            methodArgs: [arg1, arg2, arg3]
        }

        // finally, we call the contracts method
        const {transaction} = await ledger.contract.callContractMethod(args)
        console.info('Call successful - tx id:', transaction)
    } catch (e) {
        // If the API returns an exception,
        // the return error object is of type HttpError
        handleError(e);
    }
}

(async () => {
    const params = await askForCallingParameters();
    await callMethodOfContract(params);
})();
