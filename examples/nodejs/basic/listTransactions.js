const {Address} = require("@signumjs/core");
const {Amount, ChainTime} = require("@signumjs/util");

const {api, askAccount, handleError} = require('../helper');

async function listTransactions(account) {
    // All API calls are asynchronous
    // The recommended pattern is using async/await
    // This makes exception handling easy using try/catch
    try {

        // we check if incoming account is either a Signum Address, or Numeric Id
        // eventually, we convert to Numeric Id
        const accountId = Address.create(account).getNumericId()

        // Now, we call the getAccountTransactions method,
        // but we want only the 100 most recent transactions, including multi-out
        const {transactions} = await api.account.getAccountTransactions(
            {
                firstIndex: 0,
                lastIndex: 100,
                includeIndirect: true,
                accountId,
            }
        );

        // now we map the fields we want to print as a table to console then
        // NOTE: for sake of simplicity we do not filter out the multi payments
        const mappedTransactions = transactions.map(t => {
            const hasReceived = t.sender !== accountId
            return {
                date: ChainTime.fromChainTimestamp(t.timestamp).getDate(),
                account: hasReceived ? t.senderRS : t.recipientRS || 'SELF',
                value: `${hasReceived ? '+' : '-'} ${Amount.fromPlanck(t.amountNQT).toString()}`, // convert from Planck value to Signa
                fee: Amount.fromPlanck(t.feeNQT).toString()
            }
        });

        console.table(mappedTransactions, ['date', 'value', 'fee', 'account'])
    } catch (e) {
        // If the API returns an exception,
        // the return error object is of type HttpError
        handleError(e);
    }
}

// // Our entry point has to be async, as our subsequent calls are.
// // This pattern keeps your app running until all async calls are executed
(async () => {
    const {account} = await askAccount();
    await listTransactions(account);
})();
