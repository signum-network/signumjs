import {Crypto} from '@peculiar/webcrypto';
import {Buffer} from 'buffer';
const crypto = new Crypto();

/**
 * Hash string into hex string
 * @param input An arbitrary text
 * @return the hash for that string in hex format
 * @module crypto
 */
export async function sha256(input: string): Promise<string> {
    const hashBuffer = await crypto.subtle.digest('SHA-256', Buffer.from(input, 'utf8'));
    return Buffer.from(hashBuffer).toString('hex');
}
