import {DefaultSendArgs} from './defaultSendArgs';
import {ContractData} from '@signumjs/contracts';
/**
 * The argument object for {@link ContractApi.publishContract}
 *
 * @param activationAmountPlanck {string} The amount in planck needed to execute the contract
 * @param codeHex {string} The compiled program in hex form (recommend to use [BlockTalk](https://github.com/burst-apps-team/blocktalk smart contracts compiler)
 * @param deadline {number} Optional deadline in minutes, default is 1440
 * @param description {string} The description of your contract (max. 1000 chars)
 * @param name {string} The name for the contract
 * @param feePlanck {string} is optional here, as it may be calculated dynamically for contracts. For automatic calculation pass an empty string
 * @param data {string} is optional here, the initial data for the contract (must be according to your data stack in your contract and in BE hex code)
 * @param dataPages {number} the number of pages to store contracts data.
 * @param callStackPages {number} the number of pages to store the call stack.
 * @param userStackPages {number} the number of pages to store the user data.
 * You can roughly say that if each data page holds 32 variables, i.e. the number of data pages is _(variableCount/32) + 1_
 *
 *
 * @see Consider publishing by reference also, which is way cheaper: {@link ContractApi.publishContractByReference}
 *
 * @category args
 */
export interface PublishContractArgs extends DefaultSendArgs {
    activationAmountPlanck: string;
    codeHex: string;
    dataPages: number;
    callStackPages: number;
    userStackPages: number;
    name: string;
    description: string;
    data?: ContractData[];
    deadline?: number;
}
