/**
 * Copyright (c) 2019 Burst Apps Team
 *
 * Credits to AJ ONeal for the two-complements stuff
 * https://coolaj86.com/articles/convert-decimal-to-hex-with-js-bigints/
 */

import {convertDecStringToHexString, convertHexEndianess} from '@signumjs/util';
import {ContractData} from './typings/contractData';
import {convertContractData} from './internal/convertContractData';
import {countDataPages} from './countDataPages';

interface DataStack {
    dataHex: string;
    dataPageCount: number;
}

/**
 * Generates a data stack message of a contracts, which can be used as initialization. The message can be used on a contract's creation with
 * {@link core.ContractApi.publishContract} or {@link core.ContractApi.publishContractByReference}
 * @param data A list of variables forming the data stack
 * @return The data stack
 * 
 */
export const generateDataStack = (data: ContractData[]): DataStack => {

    const dataHex = data
        .map(convertContractData)
        .map(long => convertDecStringToHexString(long, 16))
        .map(convertHexEndianess)
        .join('');

    const dataPageCount = countDataPages(dataHex);

    return {
        dataHex,
        dataPageCount
    };
};
