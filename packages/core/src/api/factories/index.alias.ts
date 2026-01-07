/**
 * Alias API
 * All alias/naming operations (read and write)
 * @module api/alias
 */

export {
    // Read operations (no crypto)
    getAliasById,
    getAliases,
    getAliasByName,
    getAliasesOnSale,
    searchAliasesByName,
    getTopLevelDomains,
    // Write operations (requires crypto/sign)
    sellAlias,
    buyAlias,
    buyTopLevelDomain,
} from './alias';
