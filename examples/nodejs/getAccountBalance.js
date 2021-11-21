const {Address} = require("@signumjs/core");
const {Amount} = require("@signumjs/util");

const {api, askAccount, handleApiError} = require('./helper');

async function getBalance(account) {

    // we check if incoming account is either a Signum Address, or Numeric Id
    // eventually, we convert to Numeric Id
    const address = Address.create(account)

    // All API calls are asynchronous
    // The recommended pattern is using async/await
    // This makes exception handling easy using try/catch
    try {

        // Now, we call the getAccountTransactions method,
        // but we want only the 100 most recent transactions, including multi-out
        const {balanceNQT} = await api.account.getAccountBalance(address.getNumericId());
        const balance = Amount.fromPlanck(balanceNQT)
        console.info(`Balance of ${address.getReedSolomonAddress()} is:`, balance.toString())
    } catch (e) {
        // If the API returns an exception,
        // the return error object is of type HttpError
        handleApiError(e);
    }
}

// // Our entry point has to be async, as our subsequent calls are.
// // This pattern keeps your app running until all async calls are executed
(async () => {
    const {account} = await askAccount();
    await getBalance(account);
})();
