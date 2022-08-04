/**
 * Copyright (c) 2022 Signum Network
 */

import {ContractData} from './typings';
import {convertHexEndianess, convertHexStringToDecString, convertStringToHexString} from '@signumjs/util';

/**
 * Converts a short string into [[ContractData]] to be used as argument for smart contract calls, i.e. [[generateMethodCall]]
 *
 * @param {string} shortString A short alphanumerical string of at maximum 8 characters (bytes) length.
 * @return A compatible numerical representation which can be used as string in a smart contract.
 * @module contracts
 */
export function convertShortStringToContractData(shortString: string): ContractData {
    const MaxChars = 8;
    if (shortString.length > MaxChars) {
        throw new Error(`At maximum ${MaxChars} bytes/characters are supported`);
    }
    return convertHexStringToDecString(convertHexEndianess(convertStringToHexString(shortString)));
}
