import {DefaultSendArgs} from './defaultSendArgs';


/**
 * The argument object for [[AliasApi.buyAlias]]
 *
 * @param alias The alias Id
 * @param aliasName Alternative to alias Id
 * @param amountPlanck The amount for buy in Planck
 * @module core
 */
export interface BuyAliasArgs extends DefaultSendArgs {
    aliasId: string;
    aliasName?: string;
    amountPlanck: string;
}
