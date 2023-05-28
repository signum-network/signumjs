/**
 * Copyright (c) 2020 Burst Apps Team
 * Copyright (c) 2022 Signum Network
 */
import {ChainService} from '../../../service/chainService';
import {UnsignedTransaction} from '../../../typings/unsignedTransaction';
import {DefaultDeadline} from '../../../constants';
import {createParametersFromAttachment} from '../../../internal/createParametersFromAttachment';
import {PlaceOrderArgs} from '../../../typings/args';
import {signIfPrivateKey} from '../../../internal/signIfPrivateKey';
import {convertPlanckToAssetPrice} from '@signumjs/util';
import {Asset} from '../../../typings/asset';

interface GenericPlaceOrderArgs extends PlaceOrderArgs {
    type: 'bid' | 'ask';
}

/**
 * @ignore
 * This is an internal helper
 * See details at [[AssetApi.placeAskOrder]] [[AssetApi.placeBidOrder]]
 * @module core.api.factories
 */
export const placeOrder = (service: ChainService) =>
    (args: GenericPlaceOrderArgs) =>
        signIfPrivateKey(service, args, async (a: GenericPlaceOrderArgs) => {

            let decimals = args.decimals;
            if (decimals ===  undefined) {
                const  asset = await service.query<Asset>('getAsset', {asset: args.assetId});
                decimals = asset.decimals;
            }

            let parameters = {
                asset: a.assetId,
                priceNQT: convertPlanckToAssetPrice(a.pricePlanck, decimals),
                quantityQNT: a.quantity,
                publicKey: a.senderPublicKey,
                feeNQT: a.feePlanck,
                deadline: a.deadline || DefaultDeadline,
                referencedTransactionFullHash: a.referencedTransactionFullHash || undefined
            };

            if (a.attachment) {
                parameters = createParametersFromAttachment(a.attachment, parameters);
            }

            const method = a.type === 'ask' ? 'placeAskOrder' : 'placeBidOrder';
            return service.send<UnsignedTransaction>(method, parameters);
        });
