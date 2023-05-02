const {Address} = require("@signumjs/core");
const {Amount} = require("@signumjs/util");

const {api, askAccount, handleError} = require('../helper');

async function getBalance(account) {
    // All API calls are asynchronous
    // The recommended pattern is using async/await
    // This makes exception handling easy using try/catch
    try {
        // We just create an address instance of incoming account string, which
        // might be the numeric id or an address like 'S-ABCD....'
        // It throws an error, if the input is not a valid address or account id
        const address = Address.create(account)

        // Now, we call the getAccountBalance method,
        const {balanceNQT} = await api.account.getAccountBalance(address.getNumericId());
        const balance = Amount.fromPlanck(balanceNQT)
        console.info(`Balance of ${address.getReedSolomonAddress()} is:`, balance.toString())
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
    await getBalance(account);
})();
