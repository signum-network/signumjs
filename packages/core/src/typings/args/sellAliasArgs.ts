import {DefaultSendArgs} from './defaultSendArgs';


/**
 * The argument object for [[AccountApi.sellAlias]]
 *
 * @param aliasId The alias Id
 * @param aliasName The alias name as an alternative for alias Id
 * @param amountPlanck The sale amount  in Planck
 * @param recipientId The optional recipient Id. If given, then only that recipient can buy the alias.
 * @param recipientPublicKey The optional recipient public key.
 * @module core
 */
export interface SellAliasArgs extends DefaultSendArgs {
    aliasId?: string;
    aliasName?: string;
    amountPlanck: string;
    recipientId?: string;
    recipientPublicKey?: string;
}
