import {DefaultSendArgs} from './defaultSendArgs';


/**
 * The argument object for {@link AccountApi.setAlias}
 *
 * @param aliasName The alias name
 * @param aliasUri The alias uri
 * @param tld The name of the Top Level Domain (TLD) aka namespace where this alias belongs to
*
* @category args
*/
export interface SetAliasArgs extends DefaultSendArgs {
    aliasName: string;
    aliasURI?: string;
    tld?: string;
}
