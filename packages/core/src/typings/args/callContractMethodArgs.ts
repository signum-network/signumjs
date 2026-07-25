/**
 * Original work Copyright (c) 2022,2026 Signum Network
 */

import {ContractData} from '@signumjs/contracts';
import {DefaultSendArgs} from './defaultSendArgs';
import {MultioutAssetQuantities} from '../multioutAssetQuantities';

/**
 * The argument object for {@link ContractApi.callContractMethod}
 * @param amountPlanck The amount in planck to be paid for contract execution
 * @param assetQuantities The list of assets to be sent to the contract
 * @param contractId The id of the contract
 * @param methodArgs The arguments to be passed to the contract method
 * @param methodId The id of the contract method
 * @category args
 */
export interface CallContractMethodArgs extends DefaultSendArgs {
    amountPlanck: string;
    assetQuantities?: MultioutAssetQuantities[];
    contractId: string;
    methodArgs?: ContractData[];
    methodId: string;
}
