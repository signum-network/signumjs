/**
 * Copyright (c) 2022 Signum Network
 */
import { SRC44ParseException } from './exceptions';
import {IpfsMediaType} from './typings';

/**
 *
 * Parse IPFS Media Data structure
 *
 * @internal
 * @param o
 * @category SRC44
 */
export function parseIpfsMedia(o: object): IpfsMediaType {
    if (!o) {
        return undefined;
    }
    const keys = Object.keys(o);
    if (keys.length === 1) {
        const ipfsCid = keys[0];
        const mimeType = o[ipfsCid];
        if (!mimeType.startsWith('image')) {
            throw new SRC44ParseException(`Only image Mime Types allowed. Got [${mimeType}]`);
        }
        return {
            ipfsCid,
            mimeType
        };
    }
    throw new SRC44ParseException('Could not parse IPFS Media data');
}
