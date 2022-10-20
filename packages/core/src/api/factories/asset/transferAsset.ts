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
 * Use with [[ApiComposer]] and belongs to [[AssetApi]].
 *
 * See details at [[AssetApi.transferAsset]]
 * @module core.api.factories
 *
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
                amountNQT: a.amountPlanck,
                deadline: a.deadline || DefaultDeadline,
                referencedTransactionFullHash: a.referencedTransactionFullHash
            };

            if (a.attachment) {
                parameters = createParametersFromAttachment(a.attachment, parameters);
            }

            return service.send<UnsignedTransaction>('transferAsset', parameters);
        }
    );
