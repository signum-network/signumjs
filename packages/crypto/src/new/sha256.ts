import {crypto, Buffer} from './crypto';

/**
 * Hash string into byte array
 * @param input An arbitrary text (utf-8)
 * @return the hash for that string in Uint8Array
 * @module crypto
 */
export async function sha256Raw(input: string): Promise<ArrayBuffer> {
    return crypto.subtle.digest('SHA-256', Buffer.from(input, 'utf8'));
}


/**
 * Hash string into byte array
 * @param input An arbitrary text (utf-8)
 * @return the hash for that string in Uint8Array
 * @module crypto
 */
export async function sha256AsByte(input: string): Promise<Uint8Array> {
    return new Uint8Array((await sha256Raw(input)));
}

/**
 * Hash string into hex string
 * @param input An arbitrary text (utf-8)
 * @return the hash for that string in hex format
 * @module crypto
 */
export async function sha256AsHex(input: string): Promise<string> {
    return Buffer.from((await sha256Raw(input))).toString('hex');
}

/**
 * Hash string into base64 string
 * @param input An arbitrary text (utf-8)
 * @return the hash for that string in base64 format
 * @module crypto
 */
export async function sha256AsBase64(input: string): Promise<string> {
    return Buffer.from((await sha256Raw(input))).toString('base64');
}
