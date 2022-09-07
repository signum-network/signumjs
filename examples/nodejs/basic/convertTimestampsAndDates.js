const {ChainTime} = require("@signumjs/util");

(()=> {
    console.log('The current block timestamp is', ChainTime.fromDate(new Date()).getChainTimestamp())
    console.log('The Signum Mainnet went live on', ChainTime.fromChainTimestamp(0).getDate().toUTCString(), '(local time)')
    console.log('Expressed in the Epoch timestamp (1.1.1970) it was', ChainTime.fromChainTimestamp(0).getEpoch())
})()
