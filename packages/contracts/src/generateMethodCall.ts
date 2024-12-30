/**
 * Copyright (c) 2019 Burst Apps Team
 * Modified (c) 2022 Signum Network
 *
 * Credits to AJ ONeal for the two-complements stuff
 * https://coolaj86.com/articles/convert-decimal-to-hex-with-js-bigints/
 */

import {convertDecStringToHexString, convertHexEndianess} from '@signumjs/util';
import {GenerateMethodCallArgs} from './typings/args';
import {convertContractData} from './internal/convertContractData';

/**
 * Generates a method call message of a contracts public method. The message can be sent using for example
 * {@link core.MessageApi.sendMessage} with `messageIsText = false` or {@link core.ContractApi.callContractMethod}]
 * @param args The argument object
 * @return A hex string that can be used as contracts transaction message
 */
export const generateMethodCall = (args: GenerateMethodCallArgs): string => {
    const argArray = args.methodArgs ? [args.methodId, ...args.methodArgs] : [args.methodId];
    return argArray
        .map(convertContractData)
        .map(long => convertDecStringToHexString(long, 16))
        .map(convertHexEndianess)
        .join('');
};
