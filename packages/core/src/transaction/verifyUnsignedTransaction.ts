import {Transaction} from '../typings/transaction';
import {parseTransactionBytes} from './parseTransactionBytes/parseTransactionBytes';

/**
 * Verifies if an unsigned Transaction matches another Transaction
 * @param transaction The transaction object that should match to unsigned Transaction
 * @param unsignedTransactionBytes The unsigned transaction message in hex representation
 * @throws Error if no match was found
 */
export const verifyUnsignedTransaction = (transaction: Transaction, unsignedTransactionBytes: string): void => {
    try {
        const unsignedTransaction = parseTransactionBytes(unsignedTransactionBytes);

        for (const prop in transaction) {
            if (prop !== undefined &&
                transaction[prop] !== unsignedTransaction[prop]) {
                throw new Error();
            }
        }

    } catch (e) {
        throw new Error('Transaction not verified');
    }
};
