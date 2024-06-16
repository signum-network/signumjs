/**
 * Original work Copyright (c) 2024 Signum Network
 */

import {crypto, Buffer} from './crypto';

export type InputEncoding = 'utf8' | 'hex' | 'base64';
/**
 * Hash string into raw array buffer
 * @param input An arbitrary text
 * @param encoding The encoding of input type (default: 'utf8')
 * @return the hash for that string in ArrayBuffer
 * @module crypto
 */
export async function sha256Raw(input: string, encoding: InputEncoding ): Promise<ArrayBuffer> {
    return crypto.provider.sha256(Buffer.from(input, encoding));
}


/**
 * Hash string into byte array
 * @param input An arbitrary text
 * @param encoding The encoding of input type (default: 'utf8')
 * @return the hash for that string in Uint8Array
 * @module crypto
 */
export async function sha256AsBytes(input: string, encoding: InputEncoding = 'utf8' ): Promise<Uint8Array> {
    return new Uint8Array((await sha256Raw(input, encoding)));
}

/**
 * Hash string into hex string
 * @param input An arbitrary text (utf-8)
 * @param encoding The encoding of input type (default: 'utf8')
 * @return the hash for that string in hex format
 * @module crypto
 */
export async function sha256AsHex(input: string, encoding: InputEncoding = 'utf8'): Promise<string> {
    return Buffer.from((await sha256Raw(input, encoding))).toString('hex');
}

/**
 * Hash string into base64 string
 * @param input An arbitrary text (utf-8)
 * @param encoding The encoding of input type (default: 'utf8')
 * @return the hash for that string in base64 format
 * @module crypto
 */
export async function sha256AsBase64(input: string, encoding: InputEncoding = 'utf8'): Promise<string> {
    return Buffer.from((await sha256Raw(input, encoding))).toString('base64');
}

/**
 * Hashes binary data into byte array
 * @param data A hex data string or byte array
 * @return the hash for that as byte array
 * @module crypto
 */
export async function sha256Binary(data: string | Uint8Array): Promise<Uint8Array> {
    const b: Uint8Array = typeof data === 'string' ? Buffer.from(data, 'hex') : data;
    return new Uint8Array(await crypto.provider.sha256(b));
}
