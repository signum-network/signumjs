/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2024 Signum Network
 * @module crypto
 * @internal
 * @ignore
 */

import {Crypto} from '@peculiar/webcrypto';
import {Buffer} from 'buffer';

const crypto = new Crypto();

export {
    crypto,
    Buffer
};

export const CryptoParams = {
    IvLength: 16,
    SharedKeyLength: 32
};

export async function getCryptoKey(rawKey: ArrayBuffer): Promise<CryptoKey> {
    return crypto.subtle.importKey(
        'raw',
        rawKey,
        'AES-CBC',
        true,
        ['encrypt', 'decrypt']
    );
}
