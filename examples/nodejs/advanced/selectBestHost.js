const {LedgerClientFactory} = require("@signumjs/core");
const {handleError} = require("../helper");

/**
 * This example shows how to select the fastest responding node (aka "best") from a list of predefined node urls
 */
async function selectBestHost() {
    try {
        const featuredNodes = [
            'http://localhost:8125',
            'https://europe.signum.network',
            'https://europe1.signum.network',
            'https://europe2.signum.network',
            'https://europe3.signum.network',
            'https://brazil.signum.network',
            'https://australia.signum.network',
            'https://us-east.signum.network',
        ]

        const ledger = LedgerClientFactory.createClient({
            nodeHost: featuredNodes[0], // default node
            reliableNodeHosts: featuredNodes // set this list, when you plan to use the `selectBestHost` method
        })

        // by calling this method all nodes from `reliableNodeHosts` will be requested to see who's responding fastest
        // We want the ledger to be re-configured to the best node automatically, that's why we pass `true` as first argument
        const selectedHost = await ledger.service.selectBestHost(true)

        console.log('Fastest Responding Node', selectedHost)
        // you can also get the current selected host from the ledger client, like this
        // ledger.service.settings.nodeHost



    } catch (e) {
        // If the API returns an exception,
        // the return error object is of type HttpError
        handleError(e);
    }
}

(async () => {
    await selectBestHost();
})();
