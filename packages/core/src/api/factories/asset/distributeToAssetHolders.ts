/**
 * Original (c) 2022 Signum Network
 */
import {ChainService} from '../../../service/chainService';
import {UnsignedTransaction} from '../../../typings/unsignedTransaction';
import {DefaultDeadline} from '../../../constants';
import {createParametersFromAttachment} from '../../../internal/createParametersFromAttachment';
import {signIfPrivateKey} from '../../../internal/signIfPrivateKey';
import {DistributeToAssetHoldersArgs} from '../../../typings/args';

/**
 *
 * Use with {@link ApiComposer} and belongs to {@link AssetApi}.
 *
 * See details at {@link AssetApi.distributeToAssetHolders}
 * 
*
* @category factories
*/
export const distributeToAssetHolders = (service: ChainService) =>
    (args: DistributeToAssetHoldersArgs) => signIfPrivateKey(service, args, async (a: DistributeToAssetHoldersArgs) => {

            if ((a.additionalAssetId && !a.additionalAssetQuantity) ||
                (!a.additionalAssetId && a.additionalAssetQuantity)) {
                throw new Error('When given "additionalAssetId", you need to provide "additionalAssetQuantity" also, and vice-versa');
            }

            let parameters = {
                asset: a.assetId,
                quantityMinimumQNT: a.minimumHoldQuantity || '0',
                amountNQT: a.totalAmountPlanck || undefined,
                assetToDistribute: a.additionalAssetId || undefined,
                quantityQNT: a.additionalAssetQuantity || undefined,
                feeNQT: a.feePlanck,
                deadline: a.deadline || DefaultDeadline,
                publicKey: a.senderPublicKey,
                referencedTransactionFullHash: a.referencedTransactionFullHash || undefined
            };

            if (a.attachment) {
                parameters = createParametersFromAttachment(a.attachment, parameters);
            }

            return service.send<UnsignedTransaction>('distributeToAssetHolders', parameters);
        }
    );
