const {HttpClientFactory} = require('@signumjs/http')
const {handleError} = require('../helper');

function formatCurrency(value) {
    return (value).toFixed(4)
}

/**
 * This is a simple example to show how to use the HttpClientFactory to make any kind of Http requests
 *
 * This module is just a very lightweight wrapper around axios
 * @return {Promise<void>}
 */
async function checkSignumTicker() {
    try {
        // create your client using the factory...
        const coingeckoClient = HttpClientFactory.createHttpClient("https://api.coingecko.com/api/v3/coins")

        // make your request with the relative url
        const {response} = await coingeckoClient.get('signum?tickers=false&community_data=false&developer_data=false&market_data=true')
        console.info(formatCurrency(response.market_data.current_price.btc * 10e7), ' SATS (BTC)')
        console.info(formatCurrency(response.market_data.current_price.usd), ' USD')
        console.info(formatCurrency(response.market_data.current_price.eur), ' EUR')
    } catch (e) {
        // if the request fails the error is of type HttpError
        handleError(e)
    }
}

(async () => {
    await checkSignumTicker();
})();
