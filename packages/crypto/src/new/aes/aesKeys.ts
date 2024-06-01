import {Crypto} from '@peculiar/webcrypto';

const crypto = new Crypto();

export async function importAESKey(rawKey: ArrayBuffer): Promise<CryptoKey> {
    return crypto.subtle.importKey(
        'raw',
        rawKey,
        'AES-CBC',
        true,
        ['encrypt', 'decrypt']
    );
}


export async function generateAESKey(): Promise<CryptoKey> {
    return crypto.subtle.generateKey(
        {
            name: 'AES-CBC',
            length: 256
        },
        true, // extractable
        ['encrypt', 'decrypt']
    );
}
