/**
 * Copyright (c) 2022 Signum Network
 */

/**
 * Counts the data pages for given initialization data stack
 *
 * @param dataHex The contracts initial data stack in hex form
 * @return The number of data pages for the passed data
 *
 * 
 */
export function countDataPages(dataHex: string ): number {
    return Math.max(Math.ceil((dataHex.length / 16) / 32), 1);
}
