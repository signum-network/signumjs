/**
 * Original work Copyright (c) 2023 Signum Network
 */

import {TopLevelDomain} from './topLevelDomain';

/**
 * Top Level Domain List
 *
 * @category entities
 */
export interface TopLevelDomainList {
    tlds: TopLevelDomain[];
    requestProcessingTime: number;
}
