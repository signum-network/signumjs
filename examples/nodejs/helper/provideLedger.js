const {LedgerClientFactory} = require("@signumjs/core");

// this is not recommended in production, but it may happen that the SSL cert of a peer is not
// completely valid
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

// We create the ledger with a custom node host
module.exports = (nodeHost) => {
    const ledger = LedgerClientFactory.createClient({
        nodeHost
    });

    console.info('-------------------------------------------');
    console.info(`The selected Signum Node is node is: ${ledger.service.settings.nodeHost}`);
    console.info('-------------------------------------------');

    return ledger
}
