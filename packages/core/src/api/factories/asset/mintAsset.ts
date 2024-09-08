/**
 * Copyright (c) 2022 Signum Network
 */
import {ChainService} from '../../../service/chainService';
import {UnsignedTransaction} from '../../../typings/unsignedTransaction';
import {DefaultDeadline} from '../../../constants';
import {createParametersFromAttachment} from '../../../internal/createParametersFromAttachment';
import {MintAssetArgs} from '../../../typings/args';
import {signIfPrivateKey} from '../../../internal/signIfPrivateKey';

/**
 *
 * Use with {@link ApiComposer} and belongs to {@link AssetApi}.
 *
 * See details at {@link AssetApi.mintAsset}
 * 
*
* @category factories
*/
export const mintAsset = (service: ChainService) =>
    (args: MintAssetArgs) => signIfPrivateKey(service, args,
        async (a: MintAssetArgs) => {
            let parameters = {
                asset: a.assetId,
                quantityQNT: a.quantity,
                publicKey: a.senderPublicKey,
                feeNQT: a.feePlanck,
                deadline: a.deadline || DefaultDeadline,
                referencedTransactionFullHash: a.referencedTransactionFullHash || undefined
            };

            if (a.attachment) {
                parameters = createParametersFromAttachment(a.attachment, parameters);
            }

            return service.send<UnsignedTransaction>('mintAsset', parameters);
        });
