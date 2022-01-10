import {DefaultSendArgs} from './defaultSendArgs';
/**
 * The argument object for [[ContractApi.publishContract]]
 *
 * @param activationAmountPlanck {string} The amount in planck needed to execute the contract
 * @param codeHex {string} The compiled program in hex form (recommend to use [BlockTalk](https://github.com/burst-apps-team/blocktalk smart contracts compiler)
 * @param deadline {number} Optional deadline in minutes, default is 1440
 * @param description {string} The description of your contract (max. 1000 chars)
 * @param name {string} The name for the contract
 * @param feePlanck {string} is optional here, as it may be calculated dynamically for contracts. You can pass empty string
 * @module core
 *
 * @see Consider publishing by reference also, which is way cheaper: [[ContractApi.publishContractByReference]]
 */

export interface PublishContractArgs extends DefaultSendArgs {
    activationAmountPlanck: string;
    codeHex?: string;
    deadline?: number;
    description: string;
    name: string;
    // TODO: once supported need to consider this, too
    // cpages: string;
    // data: string;
    // dpages: number;
    // uspages: string;
}
