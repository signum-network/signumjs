/**
 * Copyright (c) 2019 Burst Apps Team
 */

import {generateSignature, generateSignedTransactionBytes, verifySignature, } from '@signumjs/crypto';
import {broadcastTransaction} from './broadcastTransaction';
import {ChainService} from '../../../service';
import {TransactionId} from '../../../typings/transactionId';
import {UnsignedTransactionArgs} from '../../../typings/args/unsignedTransactionArgs';


/**
 * Use with [[ApiComposer]] and belongs to [[TransactionApi]].
 *
 * See details at [[TransactionApi.signAndBroadcastTransaction]]
 * @module core.api.factories
 */
export const signAndBroadcastTransaction = (chainService: ChainService):
    (unsignedTransaction: UnsignedTransactionArgs) => Promise<TransactionId> =>
    async (unsignedTransaction): Promise<TransactionId> => {

        const {unsignedHexMessage, senderPrivateKey, senderPublicKey} = unsignedTransaction;

        const signature = await generateSignature(unsignedHexMessage, senderPrivateKey);
        const isValid = await verifySignature(signature, unsignedHexMessage, senderPublicKey);
        if (!isValid) {
            throw new Error('The signed message could not be verified! Transaction not broadcasted!');
        }

        const signedMessage = generateSignedTransactionBytes(unsignedHexMessage, signature);
        return broadcastTransaction(chainService)(signedMessage);
    };

