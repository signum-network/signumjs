const {composeApi} = require("@signumjs/core");

// this is not recommended, but it may happen that the SSL cert of a peer is not
// completely valid
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

// this is how you configure your api
// We configured the setting withing the package.json file
// of course, it can be defined in many different ways, e.g.
// separate configuration files, environment variables, etc.
const api = composeApi({
    nodeHost: "https://europe.signum.network"
});

console.info('-------------------------------------------');
console.info(`The selected Signum Node is node is: ${api.service.settings.nodeHost}`);
console.info('-------------------------------------------');

module.exports = api;
