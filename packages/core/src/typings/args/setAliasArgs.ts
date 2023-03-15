import {DefaultSendArgs} from './defaultSendArgs';


/**
 * The argument object for [[AccountApi.setAlias]]
 *
 * @param aliasName The alias name
 * @param aliasUri The alias uri
 * @param tld The name of the Top Level Domain (TLD) aka namespace where this alias belongs to
 * @module core
 */
export interface SetAliasArgs extends DefaultSendArgs {
    aliasName: string;
    aliasURI?: string;
    tld?: string;
}
