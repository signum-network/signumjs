import {crypto} from './crypto';

export function randomBytes(length: number): Uint8Array {
    const buffer = new Uint8Array(length);
    crypto.getRandomValues(buffer);
    return buffer;
}

