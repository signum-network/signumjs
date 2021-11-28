const {HttpClientFactory} = require('@signumjs/http')
const {handleError} = require('./helper');

function formatCurrency(value) {
    return (value).toFixed(4)
}

async function checkSignumTicker() {
    try {
        const coingeckoClient = HttpClientFactory.createHttpClient("https://api.coingecko.com/api/v3/coins")
        const {response} = await coingeckoClient.get('signum?tickers=false&community_data=false&developer_data=false&market_data=true')
        console.info(formatCurrency(response.market_data.current_price.btc * 10e7), ' SATS (BTC)')
        console.info(formatCurrency(response.market_data.current_price.usd), ' USD')
        console.info(formatCurrency(response.market_data.current_price.eur), ' EUR')
    } catch (e) {
        handleError(e)
    }
}

(async () => {
    await checkSignumTicker();
})();
