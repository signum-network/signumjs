const {composeApi} = require("@signumjs/core");

// this is not recommended, but it may happen that the SSL cert of a peer is not
// completely valid
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

// this is how you configure your api
// Alternatively, you can use LedgerClientFactory.create({...})
const api = composeApi({
    nodeHost: "https://europe.signum.network"
});

console.info('-------------------------------------------');
console.info(`The selected Signum Node is node is: ${api.service.settings.nodeHost}`);
console.info('-------------------------------------------');

module.exports = api;
