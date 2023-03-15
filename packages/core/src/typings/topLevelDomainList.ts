/**
 * Original work Copyright (c) 2023 Signum Network
 */

import {TopLevelDomain} from './topLevelDomain';

/**
 * Top Level Domain List
 *
 * @module core
 */
export interface TopLevelDomainList {
    tlds: TopLevelDomain[];
    requestProcessingTime: number;
}
