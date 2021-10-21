import {Transaction} from '../typings/transaction';
import {parseTransactionBytes} from './parseTransactionBytes';

/**
 * Verifies if an unsigned Transaction matches another Transaction
 * @param transaction The transaction object that should match to unsigned Transaction
 * @param unsignedTransactionBytes The unsigned transaction message in hex representation
 * @throws Error if no match was found
 */
export const verifyUnsignedTransaction = (transaction: Transaction, unsignedTransactionBytes: string): void => {
    try {
        const unsignedTransaction = parseTransactionBytes(unsignedTransactionBytes);
        if (!(
            transaction.subtype === unsignedTransaction.subtype
            && transaction.type === unsignedTransaction.type
            && transaction.deadline === unsignedTransaction.deadline
            && transaction.recipient === unsignedTransaction.recipient
            && transaction.feeNQT === unsignedTransaction.feeNQT
            && transaction.amountNQT === unsignedTransaction.amountNQT
            && transaction.senderPublicKey === unsignedTransaction.senderPublicKey
            /* attachment check missing yet */
        )) {
            throw new Error();
        }

    } catch (e) {
        throw new Error('Transaction not verified');
    }
};
