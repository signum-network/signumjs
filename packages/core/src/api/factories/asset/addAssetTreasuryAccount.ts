/**
 * Original (c) 2022 Signum Network
 */
import {ChainService} from '../../../service/chainService';
import {UnsignedTransaction} from '../../../typings/unsignedTransaction';
import {DefaultDeadline} from '../../../constants';
import {createParametersFromAttachment} from '../../../internal/createParametersFromAttachment';
import {signIfPrivateKey} from '../../../internal/signIfPrivateKey';
import {AddAssetTreasuryAccountArgs} from '../../../typings/args';

/**
 *
 * Use with {@link ApiComposer} and belongs to {@link AssetApi}.
 *
 * See details at {@link AssetApi.addAssetTreasuryAccount}
 * 
*
* @category factories
*/
export const addAssetTreasuryAccount = (service: ChainService) =>
    (args: AddAssetTreasuryAccountArgs) => signIfPrivateKey(service, args, async (a: AddAssetTreasuryAccountArgs) => {
            let parameters = {
                recipient: a.accountId,
                publicKey: a.senderPublicKey,
                recipientPublicKey: a.recipientPublicKey || undefined,
                referencedTransactionFullHash: a.referencedTransactionFullHash,
                feeNQT: a.feePlanck,
                deadline: a.deadline || DefaultDeadline
            };

            if (a.attachment) {
                parameters = createParametersFromAttachment(a.attachment, parameters);
            }

            return service.send<UnsignedTransaction>('addAssetTreasuryAccount', parameters);
        }
    );
