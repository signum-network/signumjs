import {TransactionId} from '../transactionId';
import {Alias} from '../alias';
import {UnsignedTransaction} from '../unsignedTransaction';
import {SetAliasArgs} from '../args/setAliasArgs';
import {AliasList} from '../aliasList';
import {BuyAliasArgs, GetAliasesOnSaleArgs, SellAliasArgs} from '../args';

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
     * Sets or Updates an Alias
     * @param {SetAliasArgs} args The arguments
     *
     * @return The Transaction Id or Unsigned Bytes as Hex String if no private key was sent
     */
    setAlias: (args: SetAliasArgs) => Promise<TransactionId | UnsignedTransaction>;

    /**
     * Get all aliases, which are on sale.
     * @param {GetAliasesOnSaleArgs} args The arguments
     * @return {Promise<Alias>} The Alias List (at maximum 500 per page)
     */
    getAliasesOnSale: (args: GetAliasesOnSaleArgs) => Promise<AliasList>;

    /**
     * Buys an Alias
     * @param args The args
     *
     * @return The Transaction Id or Unsigned Bytes as Hex String if no private key was sent
     */
    buyAlias: (args: BuyAliasArgs) => Promise<TransactionId | UnsignedTransaction>;

    /**
     * Sells an Alias. Sales can be public if no recipient is defined, i.e. everybody can buy it, or
     * only per account in case the recipient is given.
     * @param args The args
     *
     * @return The Transaction Id or Unsigned Bytes as Hex String if no private key was sent
     */
    sellAlias: (args: SellAliasArgs) => Promise<TransactionId | UnsignedTransaction>;
}
