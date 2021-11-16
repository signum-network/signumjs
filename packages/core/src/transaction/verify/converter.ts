import {convertHexEndianess, convertHexStringToDecString} from '@signumjs/util';

const _be = (hex: string) => hex.length > 2 ? convertHexEndianess(hex) : hex;

export const hexToNumber = (hex: string): number => parseInt(convertHexStringToDecString(_be(hex)), 10);
export const hexToDecStr = (hex: string): string => convertHexStringToDecString(_be(hex));
