/**
 * Original work Copyright (c) 2023 Signum Network
 */
import {ChainService} from '../../../service/chainService';
import {Amount} from '@signumjs/util';
import {getAsset} from './getAsset';
import {CalculateDistributionFeeArgs} from '../../../typings/args/calculateDistributionFeeArgs';
import {DistributionFee} from '../../../typings/distributionFee';


/**
 * Use with {@link ApiComposer} and belongs to {@link AssetApi}.
 *
 * See details at {@link AssetApi.calculateDistributionFee}
 * @see also {@link AssetApi.distributeToAssetHolders}
 *
*
* @category factories
*/
export const calculateDistributionFee = (service: ChainService):
    (args: CalculateDistributionFeeArgs) => Promise<DistributionFee> =>
    async (args): Promise<DistributionFee> => {
        const {assetId, minimumQuantity} = args;
        const  {numberOfAccounts} = await getAsset(service)({assetId, minimumQuantity});

        const minFee = Amount.fromSigna(0.01);
        const feePerHolders = minFee.clone().multiply(numberOfAccounts);
        const fee = feePerHolders.greater(minFee) ? feePerHolders : minFee;

        return {
            fee,
            numberOfAccounts,
        };
    };
