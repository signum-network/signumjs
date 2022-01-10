/**
 * The options for the Deeplinkable Wallet
 */
export interface DeeplinkableWalletOptions {
    /**
     * If true in browser environment, the method calls will try to open the deep link.
     * If set to false, the methods just return the generated deeplink.
     * In NodeJS this flag will be ignored
     */
    openInBrowser?: boolean;
    /**
     * Browser do not support custom URI protocols, i.e. `signum://`, so they need
     * a redirect proxy instead. Here you can customize your proxy, but its default is
     * set to https://burst-balance-alert.vercel.app/api/redirect?url=
     */
    redirectProxy?: string;
}
