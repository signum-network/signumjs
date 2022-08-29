const {Address} = require("@signumjs/core");
const {Amount, ChainValue} = require("@signumjs/util");

const {api, askAccount, handleError} = require('../helper');

async function getTokenBalances(account) {
    // All API calls are asynchronous
    // The recommended pattern is using async/await
    // This makes exception handling easy using try/catch
    try {
        // We just create an address instance of incoming account string, which
        // might be the numeric id or an address like 'S-ABCD....'
        // It throws an error, if the input is not a valid address or account id
        const address = Address.create(account)

        // Now, we call the getAccount method, which gives us also the token balances
        const {assetBalances} = await api.account.getAccount({accountId: address.getNumericId()});

        if(!assetBalances){
            console.info(`Account ${address.getReedSolomonAddress()} owns no assets`)
            return;
        }
        // unfortunately, the balance objects do not provide the necessary decimals of the token,
        // such we need to get these information additionally
        // Using Promise.all runs the requests in parallel
        const requestPromises =  assetBalances.map( ({asset}) => api.asset.getAsset({assetId:asset}))
        const assetMetadata = await Promise.all(requestPromises)

        console.info(`Token Balances of ${address.getReedSolomonAddress()} are:`)
        for(let {asset, balanceQNT} of assetBalances){
            const {name, decimals} = assetMetadata.find( a => a.asset === asset) // existence is guaranteed
            // The token quantity is being determined by the given supply and decimals. It's similar to the concept of Signa vs Planck,
            // but with dynamic decimals (0-8). The formula to calculate the quantity is: QNT = amount * (10^decimals)
            // To simplify the Devs life we can use the value object `ChainValue` which allows us to convert from and to quantity.
            // Instead of using the name Planck/Signa the name Atomic/Compound is used
            const amount = ChainValue.create(decimals).setAtomic(balanceQNT).getCompound()
            console.info(`Token '${name}': ${amount}`)
        }
    } catch (e) {
        // If the API returns an exception,
        // the return error object is of type HttpError
        handleError(e);
    }
}

// Our entry point has to be async, as our subsequent calls are.
// This pattern keeps your app running until all async calls are executed
(async () => {
    const {account} = await askAccount();
    await getTokenBalances(account);
})();
