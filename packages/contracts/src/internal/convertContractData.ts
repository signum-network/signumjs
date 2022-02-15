import {ContractData} from '../typings/contractData';

/**
 * @internal
 * @param value
 */
export const convertContractData = (value: ContractData): string => {
    if (typeof (value) === 'boolean') {
        return value ? '1' : '0';
    }
    if (typeof (value) === 'number') {
        return `${value}`;
    }

    return value;
};
