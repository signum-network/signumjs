const {createDeeplink, Amount} = require('@signumjs/util')

/**
 * To use a link in a browser, e.g. in a <a href=''> element you need to encode the link to be URI compatible.
 * Furthermore, the link needs to be opened via a redirect service, as browsers generally do not understand
 * custom protocols.
 * @param deeplink The raw deeplink
 * @return {string} The Url to be used in a browser
 */
function asBrowserDeeplink(deeplink) {
    return "https://burst-balance-alert.vercel.app/api/redirect?url=" + encodeURIComponent(deeplink)
}


function mountDeeplink() {
    return createDeeplink({
        payload: {
            recipient: "S-465G-WL4X-SUEK-98F2J",
            amountPlanck: Amount.fromSigna(5.103635).getPlanck(),
            feePlanck: Amount.fromSigna('0.0735').getPlanck(),
            message: '59b13cb7d10d5ead3b45b8e9039ebed100000000000000000000000000000000',
            messageIsText: false,
            immutable: false,
            deadline: 1440,
            encrypt: false
        },
        action: 'pay'
    }, )
}

(() => {
    const deeplink = mountDeeplink();
    console.info("Pure deeplink", deeplink)
    console.info("Browser Url", asBrowserDeeplink(deeplink))
})();
