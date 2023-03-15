/**
 * Original work Copyright (c) 2019 Burst Apps Team
 * Modified work Copyright (c) 2022 Signum Network
 */

/**
 * Alias
 *
 * An alias is arbitrary _mutable_ on-chain data.
 *
 * This essentially allows one piece of text to be
 * substituted for another, so that keywords or keyphrases can be used to represent
 * other things – names, telephone numbers, physical addresses, web sites, account
 * numbers, email addresses, product SKU codes... almost anything you can think of.
 * @module core
 */
export interface Alias {
    account: string;
    accountRS: string;
    /**
     * If given, then this is account is on sale
     */
    priceNQT?: string;
    /**
     * If given then this alias is on sale to that specific account
     */
    buyer?: string;
    alias: string;
    aliasName: string;
    /**
     * This is the arbitrary content, up to 1000 chars
     */
    aliasURI: string;
    timestamp: number;

    /**
     * The id of the Top Level Domain (tld) aka namespace for this alias. Default is '0', which points to 'signum'
     */
    tld?: string;
    /**
     * The name of the Top Level Domain (tld) aka namespace for this alias. Default is 'signum'
     */
    tldName?: string;

    /**
     * Numbers of aliases within the namespace/ top level domain.
     */
    numberOfAlias?: number;
}
