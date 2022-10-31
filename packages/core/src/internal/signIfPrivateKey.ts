/** @ignore */
/** @internal */

/**
 * Copyright (c) 2022 Signum Network
 */


import {UnsignedTransaction} from '../typings/unsignedTransaction';
import {TransactionId} from '../typings/transactionId';
import {signAndBroadcastTransaction} from '../api/factories/transaction/signAndBroadcastTransaction';
import {DefaultSendArgs} from '../typings/args/defaultSendArgs';
import {ChainService} from '../service';
import {verifyTransaction} from './verifyTransaction';

type TransactionFn = (args: any) => Promise<UnsignedTransaction>;

export const signIfPrivateKey = async (service: ChainService,
                                       txArgs: DefaultSendArgs,
                                       transactionFn: TransactionFn): Promise<TransactionId|UnsignedTransaction> => {

    const response = await transactionFn(txArgs);

    verifyTransaction(txArgs, response);

    if (!txArgs.senderPrivateKey) {
        return response;
    }

    return signAndBroadcastTransaction(service)({
        senderPublicKey: txArgs.senderPublicKey,
        senderPrivateKey: txArgs.senderPrivateKey,
        unsignedHexMessage: response.unsignedTransactionBytes
    });

};
