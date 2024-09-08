/** @ignore */
/** @internal */

/**
 * Just a superficial check, if address seems valid
 * @param address The accountId or address
 * @throws If address is not valid
 */
export function assertAddress(address: string) {
    if (!/^.+?-([a-zA-Z0-9]{4}-){3}[a-zA-Z0-9]{5}|^\d{18,24}$/gi.test(address)) {
        throw new Error(`Invalid address: ${address}`);
    }
}


