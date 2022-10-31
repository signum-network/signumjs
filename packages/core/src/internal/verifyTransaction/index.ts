/** @ignore */
/** @internal */

import {UnsignedTransaction} from '../../typings/unsignedTransaction';
import {rebuildTransactionPostData} from './rebuildTransactionPostData';
import {DefaultSendArgs} from '../../typings/args/defaultSendArgs';

export function verifyTransaction(txSendArgs: DefaultSendArgs, unsignedTransaction: UnsignedTransaction) {
    const rebuiltObject = rebuildTransactionPostData(unsignedTransaction.unsignedTransactionBytes)

    // ... compare the nodes response with the send args

    throw new Error('Verification failed - Node Response does not match transaction parameters');
}
