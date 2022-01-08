const inquirer = require("inquirer");
const {Address} = require("@signumjs/core");
const {Amount, ChainTime, FeeQuantPlanck} = require("@signumjs/util");
const {provideLedger, handleError} = require('../../helper');
const {generateMasterKeys} = require("@signumjs/crypto");

const LedgerHostUrls = {
    'TestNet': 'https://europe3.testnet.signum.network',
    'MainNet': 'https://europe.signum.network',
}

/**
 * This is an example of mapping between the hashes (generated on compilation with Blocktalk)
 * and more readable names. Of course, this depends on each contract
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
                message: 'Please enter the contracts Id or Address?'
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
                name: 'arg4',
                message: 'Please enter 4th argument (enter to skip)',
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

function confirm(params) {

    console.info("These are your parameters", JSON.stringify(params))

    return inquirer.prompt([{
        type: 'input',
        name: 'passphrase',
        message: 'Please enter your passphrase and confirm the method call (Hit Enter to Abort)',
        default: null
    }])
}


async function callMethodOfContract(params) {
    try {

        const {ledger: ledgerChoice, contract, amount, method, arg1, arg2, arg3, arg4} = params;
        const ledger = provideLedger(LedgerHostUrls[ledgerChoice])
        const contractId = Address.create(contract).getNumericId()

        const {passphrase} = await confirm();
        if (!passphrase) {
            console.info('Aborted');
            process.exit(-1);
            return
        }

        const getMethodArg = (arg) => {
            const loarg = arg.toLowerCase()
            if (loarg === 'true' || loarg === 'false') {
                return loarg === 'true'
            } else if (!Number.isNaN(+loarg)) {
                return +loarg
            } else {
                return arg
            }
        }

        let methodArgs = [];
        [arg1, arg2, arg3, arg4].forEach(a => {
            if (a) {
                methodArgs.push(getMethodArg(a))
            }
        })

        const senderKeys = generateMasterKeys(passphrase);
        const args = {
            contractId,
            amountPlanck: Amount.fromSigna(amount).getPlanck(),
            senderPublicKey: senderKeys.publicKey,
            senderPrivateKey: senderKeys.signPrivateKey,
            feePlanck: "" + FeeQuantPlanck,
            methodHash: ContractMethods[method],
            methodArgs,
        }
        const {transaction} = await ledger.contract.callContractMethod(args)

        console.log('calls', args)

        //
        // console.info('Call successful - tx id:', transaction)
        return Promise.resolve()
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
