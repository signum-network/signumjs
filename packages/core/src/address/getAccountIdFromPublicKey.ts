/**
 * Original work Copyright (c) 2024 Signum Network
 */

import {sha256Binary} from '@signumjs/crypto/sha256';
import {convertHexStringToDecString} from "@signumjs/util"

/**
 * Computes the Account ID from Public Key
 * @param publicKey The public key (64 character hex string)
 * @return A numeric string - The Account ID
 *
 * @category address
 */
export function getAccountIdFromPublicKey(publicKey: string): string {
    // Hash the public key using crypto package's sha256Binary
    const hashedArray = sha256Binary(publicKey);

    // Take first 8 bytes and reverse
    const slicedArray = hashedArray.slice(0, 8).reverse();

    // Convert to hex string
    const hexString = Array.from(slicedArray)
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');

    // Convert hex to decimal
    return convertHexStringToDecString(hexString);
}
