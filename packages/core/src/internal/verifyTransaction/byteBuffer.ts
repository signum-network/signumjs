/** @ignore */
/** @internal */

import BigNumber from 'bignumber.js';

/**
 * Class to easily implement reading data sequentially. Expects hexstring
 * with big-endian bytes and methods return only positive values. Throws error
 *
 * @internal
 * @module core
 */
export default class ByteBuffer {
    private needle: number;
    private readonly transactionBytes: number[];
    private readonly hexTransactionBytes: string;

    constructor(hexString: string) {
        this.needle = 0;
        this.transactionBytes = [];
        this.hexTransactionBytes = hexString.toLowerCase();
        if (hexString.length % 2) {
            throw new Error(`Invalid Hex String: ${hexString}`);
        }
        this.transactionBytes = [];
        for (let c = 0; c < hexString.length; c += 2) {
            const byte = parseInt(hexString.substring(c, c + 2), 16);
            if (Number.isNaN(byte)) {
                throw new Error(`Invalid Hex String: ${hexString}`);
            }
            this.transactionBytes.push(byte);
        }
    }

    /** If setValue is undefined, returns the current needle position.
     * Else, sets current needle to that value.
     */
    position(setValue?: number): number | undefined {
        if (setValue === undefined) {
            return this.needle;
        }
        this.needle = setValue;
    }

    length(): number {
        return this.transactionBytes.length;
    }

    readByte(): number {
        if (this.needle + 1 > this.transactionBytes.length) {
            throw new Error('Unexpected end of input.');
        }
        const byteVal = this.transactionBytes[this.needle];
        this.needle++;
        return byteVal;
    }

    readShort(): number {
        if (this.needle + 2 > this.transactionBytes.length) {
            throw new Error('Unexpected end of input.');
        }
        const shortVal = this.transactionBytes[this.needle] + this.transactionBytes[this.needle + 1] * 256;
        this.needle += 2;
        return shortVal;
    }

    readInt(): number {
        if (this.needle + 4 > this.transactionBytes.length) {
            throw new Error('Unexpected end of input.');
        }
        const intVal = this.transactionBytes[this.needle] +
            this.transactionBytes[this.needle + 1] * 256 +
            this.transactionBytes[this.needle + 2] * 65536 +
            this.transactionBytes[this.needle + 3] * 16777216;
        this.needle += 4;
        return intVal;
    }

    readLong(): BigNumber {
        if (this.needle + 8 > this.transactionBytes.length) {
            throw new Error('Unexpected end of input.');
        }
        let longVal = new BigNumber(0);
        let longBase = new BigNumber(1);
        for (let i = 0; i < 8; i++) {
            longVal = longVal.plus(longBase.multipliedBy(this.transactionBytes[this.needle + i]));
            longBase = longBase.multipliedBy(256);
        }
        this.needle += 8;
        return longVal;
    }

    readHexString(nBytes: number): string {
        if (this.needle + nBytes > this.transactionBytes.length) {
            throw new Error('Unexpected end of input.');
        }
        const stringVal = this.hexTransactionBytes.slice(this.needle * 2, (this.needle + nBytes) * 2);
        this.needle += nBytes;
        return stringVal;
    }

    readString(nBytes: number) {
        if (this.needle + nBytes > this.transactionBytes.length) {
            throw new Error('Unexpected end of input.');
        }
        // keep escape, as this guarantees compatibility with old on-chain data
        const escapedUTF8 = escape(
            String.fromCharCode.apply(null, this.transactionBytes.slice(this.needle, this.needle + nBytes))
        );
        this.needle += nBytes;
        return decodeURIComponent(escapedUTF8);
    }
}
