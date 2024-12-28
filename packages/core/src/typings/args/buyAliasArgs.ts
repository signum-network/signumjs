import {DefaultSendArgs} from './defaultSendArgs';


/**
 * The argument object for {@link buyAlias}
 *
 * @param alias The alias Id
 * @param aliasName Alternative to alias Id
 * @param amountPlanck The amount for buy in Planck
 * @param tld The name of the Top Level Domain (TLD) aka namespace where this alias belongs to
 *
 * @category args
 */
export interface BuyAliasArgs extends DefaultSendArgs {
    aliasId: string;
    aliasName?: string;
    amountPlanck: string;
    tld?: string;
}
