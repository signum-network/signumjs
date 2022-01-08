/** @ignore */
/** @internal */

/** @module wallets */

/**
 * Just a superficial check, if address seems valid
 * @param address The accountId or address
 * @throws If address is not valid
 */
export function assertAddress(address: string) {
    if (!/^.+?-[\d\w]{4}-[\d\w]{4}-[\d\w]{4}-[\d\w]{5}|^\d{18,24}$/gi.test(address)) {
        throw new Error(`Invalid address: ${address}`);
    }
}
