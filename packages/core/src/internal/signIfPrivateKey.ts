/** @ignore */
/** @internal */

import {UnsignedTransaction} from '../typings/unsignedTransaction';
import {TransactionId} from '../typings/transactionId';
import {signAndBroadcastTransaction} from '../api/factories/transaction/signAndBroadcastTransaction';
import {DefaultSendArgs} from '../typings/args/defaultSendArgs';
import {ChainService} from '../service';

type TransactionFn = (args: any) => Promise<UnsignedTransaction>;

export const signIfPrivateKey = async (service: ChainService,
                                       txArgs: DefaultSendArgs,
                                       transactionFn: TransactionFn): Promise<TransactionId|UnsignedTransaction> => {

    const response = await transactionFn(txArgs);
    if (!txArgs.senderPrivateKey) {
        return response;
    }

    return signAndBroadcastTransaction(service)({
        senderPublicKey: txArgs.senderPublicKey,
        senderPrivateKey: txArgs.senderPrivateKey,
        unsignedHexMessage: response.unsignedTransactionBytes
    });

};
