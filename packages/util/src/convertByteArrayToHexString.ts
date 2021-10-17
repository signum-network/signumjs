/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 */

/**
 * Converts byte array to hexadecimal string
 * Inverse operation of [[convertHexStringToByteArray]]
 * @param bytes The (unsigned) byte array to be converted
 * @param uppercase If _true_, converts hex string with uppercase characters (Default: false)
 * @return {string} A hex string representing the byte array input
 * @module util
 */
export const convertByteArrayToHexString = (bytes: Uint8Array, uppercase = false): string => {
    const hex = [];
    for (const byte of bytes) {
        hex.push((byte >>> 4).toString(16));
        hex.push((byte & 0xF).toString(16));
    }
    return uppercase ? hex.join('').toUpperCase() : hex.join('');
};
