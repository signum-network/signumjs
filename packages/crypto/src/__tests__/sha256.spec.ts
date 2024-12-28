import { describe, it, expect, test } from 'vitest';

import {sha256AsBase64, sha256AsBytes, sha256AsHex, sha256Binary} from '../sha256';

describe('sha256', () => {
    // implicitely tests sha256Raw and sha256Byte
    test('Should be able to generate sha256AsHex', () => {
        const hash = sha256AsHex('Some Text');
        expect(hash).toEqual('a7fd4c665fbf6375d99046ef9c525e8578feb7a4794d119447282db151c12cae');
    });
    test('Should be able to generate sha256AsBase64', () => {
        const hash = sha256AsBase64('Some Text');
        expect(hash).toEqual('p/1MZl+/Y3XZkEbvnFJehXj+t6R5TRGURygtsVHBLK4=');
    });
});
