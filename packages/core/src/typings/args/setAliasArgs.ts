import {DefaultSendArgs} from './defaultSendArgs';


/**
 * The argument object for [[AccountApi.setAlias]]
 *
 * @param aliasName The alias name
 * @param aliasUri The alias uri
 * @module core
 */
export interface SetAliasArgs extends DefaultSendArgs {
    aliasName: string;
    aliasURI?: string;
}
