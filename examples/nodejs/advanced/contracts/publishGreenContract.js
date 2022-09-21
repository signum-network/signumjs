const {generateMasterKeys} = require("@signumjs/crypto");
const {Amount, ChainValue, convertHexStringToDecString, convertHexEndianess, convertStringToHexString} = require("@signumjs/util");
const {provideLedger, handleError, confirmTransaction, LedgerHostUrls} = require('../../helper');

/**
 * This is an example how to create a new green contract (by referencing existing code).
 * It also shows how to initialize the new contract with its own data
 *
 * Note: this example rather demonstrates how to do it - it's non-working due to non-existent contract
 */
async function publishGreenContract() {
    try {
        // Let's assume we have a contract with the following variable stack to be initialized
        // 0. Token name
        // 1. Token decimals
        // 2. Quantity to be issued
        const ledger = provideLedger(LedgerHostUrls.TestNet)

        // asking for the passphrase
        const {passphrase} = await confirmTransaction(params);
        const senderKeys = generateMasterKeys(passphrase);

        // see also https://github.com/signum-network/signumjs/issues/26
        const tokenName = convertHexStringToDecString(
            convertHexEndianess(
                convertStringToHexString('NEWTOKEN')
            ))
        const tokenDecimals = 2
        const tokenQuantity = ChainValue.create(tokenDecimals).setCompound(10_000).getAtomic()
        // this reference you get from the previous/first deployment of the contract, which serves as a template
        // think of it like classes and objects in Object Oriented Programming
        // example how to get the FULL HASH: https://t-chain.signum.network/tx/14079727760708466474
        const initialContractReference = '2AF73BFFCC3D65C3DF8063C42C75764CD1D22025A22911BB3BC7DC761A23374F'

        // Now that we have all the params we can publish a new contract instance with our custom data
        const {transaction} = await ledger.contract.publishContractByReference({
            referencedTransactionHash: initialContractReference,
            feePlanck: Amount.fromSigna(155).getPlanck(), // as the imaginary contract issues a token, we need to send at least 150 SIGNA
            data: [
                tokenName,
                tokenDecimals,
                tokenQuantity
            ],
            senderPublicKey: senderKeys.publicKey,
            senderPrivateKey: senderKeys.signPrivateKey
        })

        console.info('Call successful - tx id:', transaction)
    } catch (e) {
        // If the API returns an exception,
        // the return error object is of type HttpError
        handleError(e);
    }
}

(async () => {
    await publishGreenContract();
})();
