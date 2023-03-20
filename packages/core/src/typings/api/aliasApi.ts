import {TransactionId} from '../transactionId';
import {Alias} from '../alias';
import {UnsignedTransaction} from '../unsignedTransaction';
import {AliasList} from '../aliasList';
import {
    BuyAliasArgs,
    BuyTopLevelDomainArgs,
    GetAliasesOnSaleArgs,
    SellAliasArgs,
    SetAliasArgs,
    GetTopLevelDomainsArgs,
    SearchAliasesByNameArgs
} from '../args';
import {TopLevelDomainList} from '../topLevelDomainList';
import {GetAliasesArgs} from '../args/getAliasesArgs';

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
     * @param {string} tld optional Top Level Domain. If not given, the default domain 'signum' is being used
     * @return {Promise<Alias>} The Alias object
     */
    getAliasByName: (
        aliasName: string,
        tld?: string,
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

    /**
     * Searches for aliases by their name or part of the name
     * @param args The args
     */
    searchAliasesByName: (args: SearchAliasesByNameArgs) => Promise<AliasList>;
    /**
     * Gets all registered Top Level Domains
     * @param args The args
     */
    getTopLevelDomains: (args: GetTopLevelDomainsArgs) => Promise<TopLevelDomainList>;

    /**
     * Buys a Top Level Domain (TLD)
     * @param args The args
     */
    buyTopLevelDomain: (args: BuyTopLevelDomainArgs) => Promise<TransactionId | UnsignedTransaction>;

    /**
     * Gets the aliases
     * @param {GetAliasesArgs} args
     * @return {Promise<AliasList>} A list of aliases according the matches
     */
    getAliases: (args: GetAliasesArgs) => Promise<AliasList>;

}
