/**
 * Copyright (c) 2020 Burst Apps Team
 * Modified (c) 2022 Signum Network
 */
import {ChainService} from '../../../service/chainService';
import {UnsignedTransaction} from '../../../typings/unsignedTransaction';
import {DefaultDeadline} from '../../../constants';
import {createParametersFromAttachment} from '../../../internal/createParametersFromAttachment';
import {TransferAssetArgs} from '../../../typings/args/transferAssetArgs';
import {signIfPrivateKey} from '../../../internal/signIfPrivateKey';

/**
 *
 * Use with {@link ApiComposer} and belongs to {@link AssetApi}.
 *
 * See details at {@link AssetApi.transferAsset}
 * 
*
* @category factories
*/
export const transferAsset = (service: ChainService) =>
    (args: TransferAssetArgs) => signIfPrivateKey(service, args, async (a: TransferAssetArgs) => {
            let parameters = {
                asset: a.assetId,
                quantityQNT: a.quantity,
                publicKey: a.senderPublicKey,
                recipient: a.recipientId,
                recipientPublicKey: a.recipientPublicKey || undefined,
                feeNQT: a.feePlanck,
                amountNQT: a.amountPlanck || undefined,
                deadline: a.deadline || DefaultDeadline,
                referencedTransactionFullHash: a.referencedTransactionFullHash
            };

            if (a.attachment) {
                parameters = createParametersFromAttachment(a.attachment, parameters);
            }

            return service.send<UnsignedTransaction>('transferAsset', parameters);
        }
    );
