/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 * Modified work Copyright (c) 2024 Signum Network
 */

import {base32Length, cwmap, alphabet, initialCodeword} from './internal';
import {} from "@signumjs/crypto"
import {convertHexStringToDecString} from '@signumjs/util';

/**
 * @internal
 * Converts hexadecimal public key into numeric Id
 * @param address The Reed-Solomon address
 * @return The numeric id, or undefined if address is invalid
 * @module core
 */
export const convertPublicKeyToNumericId = (publicKey: string): string => {

    // FIXME:

    return ""
};
