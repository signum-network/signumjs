import {TransactionId} from '../transactionId';
import {Alias} from '../alias';
import {UnsignedTransaction} from '../unsignedTransaction';
import {SetAliasArgs} from '../args/setAliasArgs';
import {AliasList} from '../aliasList';

/**
 * Alias API
 *
 * Work in Progress
 *
 * @module core.api
 */
export interface AliasApi {

    /**
     * Get alias by its id, i.e. get basic account info for given alias name
     * @param {string} aliasId The alias id
     * @return {Promise<Alias>} The Alias object
     */
    getAliasById: (
        aliasId: string,
    ) => Promise<Alias>;


    /**
     * Get alias by name, i.e. get basic account info for given alias name
     * @param {string} aliasName The alias name
     * @return {Promise<Alias>} The Alias object
     */
    getAliasByName: (
        aliasName: string,
    ) => Promise<Alias>;

    /**
     * Registers an Alias
     **
     * @param args The args
     * @return The Transaction Id or Unsigned Bytes as Hex String if no private key was sent
     */
    setAlias: (args: SetAliasArgs) => Promise<TransactionId | UnsignedTransaction>;


    /**
     * Get all aliases, which are on sale.
     * @param {number} firstIndex The first index; use for pagination
     * @param {number} lastIndex The last index to be returned;  use for pagination
     * @return {Promise<Alias>} The Alias List (at maximum 500 per page)
     */
    getAliasesOnSale: (firstIndex?: number, lastIndex?: number) => Promise<AliasList>;

}
