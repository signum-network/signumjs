/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 */

/**
 * Converts a byte array into string
 * Inverse function {@link convertStringToByteArray}
 * @param byteArray The byte array to be converted
 * @param startIndex The starting index of array to be converted (Default: 0)
 * @param length The number of bytes to be considered, _iff_ startIndex is given. If _null_ the byte array's length is considered
 * @return {string} The converted string
 *
 * @category conversion
 */
export const convertByteArrayToString = (byteArray: Uint8Array, startIndex: number = 0, length: number = null): string => {
    if (length === 0) {
        return '';
    }

    let bytes = byteArray;
    if (startIndex !== 0) {
        const len = length === null ? byteArray.length - startIndex : length;
        checkBytesToIntInput(bytes, len, startIndex);
        bytes = byteArray.slice(startIndex, startIndex + len);
    }

    const escapedUTF8 = escape(String.fromCharCode.apply(null, Array.from(bytes)));
    try {
        return decodeURIComponent(escapedUTF8)
    } catch (e) {
        throw new Error('Error decoding utf-8 data');
    }
};


function checkBytesToIntInput(bytes: Uint8Array, numBytes: number, startIndex: number = 0) {
    if (startIndex < 0) {
        throw new Error('Start index should not be negative');
    }

    if (bytes.length < startIndex + numBytes) {
        throw new Error('Need at least ' + (numBytes) + ' bytes to convert to an integer');
    }
    return startIndex;
}
