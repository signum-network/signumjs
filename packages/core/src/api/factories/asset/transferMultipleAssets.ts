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
import {MultioutAssetQuantities} from '../../../typings/multioutAssetQuantities';
import {TransferMultipleAssetsArgs} from '../../../typings/args';


function mountAssetQuantitiesString(assetQuantities: MultioutAssetQuantities[]): string {
    return assetQuantities.map(({quantity, assetId}) => `${assetId}:${quantity}`).join(';');
}

function assertCorrectAssetQuantities(assetQuantities: MultioutAssetQuantities[]) {
    const MaxItems = 4;
    if (assetQuantities.length > MaxItems) {
        throw new Error(`At maximum ${MaxItems} asset-quantities are allowed`);
    }
    const assetIds = new Set<string>();
    for (const ra of assetQuantities) {
        if (assetIds.has(ra.assetId)) {
            throw new Error('Duplicate assetId found');
        }
        assetIds.add(ra.assetId);
    }
}

/**
 *
 * Use with [[ApiComposer]] and belongs to [[AssetApi]].
 *
 * See details at [[AssetApi.transferMultipleAssets]]
 * @module core.api.factories
 *
 */
export const transferMultipleAssets = (service: ChainService) =>
    (args: TransferMultipleAssetsArgs) => signIfPrivateKey(service, args, async (a: TransferAssetArgs) => {

            assertCorrectAssetQuantities(args.assetQuantities);
            const assetIdsAndQuantities = mountAssetQuantitiesString(args.assetQuantities);

            let parameters = {
                assetIdsAndQuantities,
                quantityQNT: a.quantity,
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

            return service.send<UnsignedTransaction>('transferAssetMulti', parameters);
        }
    );
