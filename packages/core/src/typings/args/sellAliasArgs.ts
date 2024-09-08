import {DefaultSendArgs} from './defaultSendArgs';


/**
 * The argument object for {@link AliasApi.sellAlias}
 *
 * @param aliasId The alias Id
 * @param aliasName The alias name as an alternative for alias Id
 * @param amountPlanck The sale amount  in Planck
 * @param recipientId The optional recipient Id. If given, then only that recipient can buy the alias.
 * @param recipientPublicKey The optional recipient public key.
 * @param tld The name of the Top Level Domain (TLD) aka namespace where this alias belongs to
*
* @category args
*/
export interface SellAliasArgs extends DefaultSendArgs {
    aliasId?: string;
    aliasName?: string;
    amountPlanck: string;
    recipientId?: string;
    recipientPublicKey?: string;
    tld?: string;
}
