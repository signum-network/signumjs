/* globals process */
/** @ignore */
/** @internal */
/** @module wallets */

/**
 * Checks if the runtime environment is NodeJS
 */
export function isNodeJS(): boolean {
    return typeof process === 'object'
        && String(process) === '[object process]'
        && !process.versions.nw;
}
