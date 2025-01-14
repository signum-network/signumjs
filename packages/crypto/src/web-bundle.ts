/**
 * This file is the entry point for web-bundle IIFE build
 * needed for Burstcoin/Signum.
 *
 * @ignore
 * @internal
 * @module crypto
 * */
export * from './decrypt';
export * from './encrypt';
export * from './random';
export * from './mnemonic';
export * from './sha256';
export * from './sign';
export * from './typings/cryptoError';
export * from './typings/signKeys';
export * from './typings/encryptedMessage';
export * from './typings/encryptedData';
export * from './typings/cryptoAdapter';
export {Buffer, Crypto} from './base'; // export as very useful!

// init web adapter
import {Crypto} from './base';
import {WebCryptoAdapter} from './adapters';

(() => {
    Crypto.init(new WebCryptoAdapter());

})();
