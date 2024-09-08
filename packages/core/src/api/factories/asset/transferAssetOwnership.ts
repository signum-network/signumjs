/**
 * Copyright (c) 2023 Signum Network
 */
import {ChainService} from '../../../service/chainService';
import {UnsignedTransaction} from '../../../typings/unsignedTransaction';
import {DefaultDeadline} from '../../../constants';
import {createParametersFromAttachment} from '../../../internal/createParametersFromAttachment';
import {signIfPrivateKey} from '../../../internal/signIfPrivateKey';
import {TransferAssetOwnershipArgs} from '../../../typings/args';

/**
 *
 * Use with {@link ApiComposer} and belongs to {@link AssetApi}.
 *
 * See details at {@link AssetApi.transferAssetOwnership}
 * 
*
* @category factories
*/
export const transferAssetOwnership = (service: ChainService) =>
    (args: TransferAssetOwnershipArgs) => signIfPrivateKey(service, args, async (a: TransferAssetOwnershipArgs) => {
            let parameters = {
                publicKey: a.senderPublicKey,
                recipient: a.recipientId,
                recipientPublicKey: a.recipientPublicKey || undefined,
                feeNQT: a.feePlanck,
                deadline: a.deadline || DefaultDeadline,
                referencedTransactionFullHash: a.referencedTransactionFullHash
            };

            if (a.attachment) {
                parameters = createParametersFromAttachment(a.attachment, parameters);
            }

            return service.send<UnsignedTransaction>('transferAssetOwnership', parameters);
        }
    );
