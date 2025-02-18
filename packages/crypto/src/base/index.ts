import {Buffer} from 'buffer';
import {Crypto} from './crypto';

export * from './ec-kcdsa';
export * from './curve25519';
export * from './cryptoParams';
export {
    Crypto,
    Buffer
};

// browser polyfill!
// @ts-ignore
globalThis.Buffer = Buffer;
