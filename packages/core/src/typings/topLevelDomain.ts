/**
 * Original work Copyright (c) 2023 Signum Network
 */

/**
 * Top Level Domain
 *
 * Top Level Domains are part of the Alias system. There are serving as namespaces for aliases
 * Look also at [SIP48](https://github.com/signum-network/SIPs/blob/master/SIP/sip-48.md)
 *
 * @category entities
 */
export interface TopLevelDomain {
    account: string;
    accountRS: string;
    alias: string;
    aliasName: string;
    timestamp: number;
    numberOfAliases: number;
}
