/**
 * Copyright (c) 2020 Burst Apps Team
 * Modified (c) 2022 Signum Network
 */
import {ChainService} from '../../../service/chainService';
import {UnsignedTransaction} from '../../../typings/unsignedTransaction';
import {DefaultDeadline} from '../../../constants';
import {createParametersFromAttachment} from '../../../internal/createParametersFromAttachment';
import {IssueAssetArgs} from '../../../typings/args';
import {signIfPrivateKey} from '../../../internal/signIfPrivateKey';

/**
 *
 * Use with [[ApiComposer]] and belongs to [[AssetApi]].
 *
 * See details at [[AssetApi.issueAsset]]
 * @module core.api.factories
 *
 */
export const issueAsset = (service: ChainService) =>
    (args: IssueAssetArgs) => signIfPrivateKey(service, args,
        async (a: IssueAssetArgs) => {
            let parameters = {
                name: a.name,
                description: a.description,
                quantityQNT: a.quantity,
                decimals: a.decimals,
                publicKey: a.senderPublicKey,
                feeNQT: a.feePlanck,
                mintable: a.mintable,
                deadline: a.deadline || DefaultDeadline,
            };

            if (a.attachment) {
                parameters = createParametersFromAttachment(a.attachment, parameters);
            }

            return service.send<UnsignedTransaction>('issueAsset', parameters);
        });
