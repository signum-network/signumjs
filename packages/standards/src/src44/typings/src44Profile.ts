/**
 * Copyright (c) 2022 Signum Network
 */
import { SRC44ProfileType } from './src44ProfileType';

interface MediaType {
    [key: string]: string;
}

/**
 * SRC44 Compliant profile structure
 *
 * See [[ProfileData]] and [[ProfileDataBuilder]] to create, update this structure
 *
 * @module standards.SRC44
 */
export interface SRC44Profile {
    /**
     * Version Number - Should be 1 for now
     */
    vs: number;
    /**
     * Name, maximal 24 characters
     */
    nm: string;
    /**
     * Description, maximal 384 characters
     */
    ds?: string;
    /**
     * Profile type
     */
    tp?: SRC44ProfileType;
    /**
     * IPFS Media Link for the Avatar
     */
    av?: MediaType;
    /**
     * IPFS Media Link for the background image
     */
    bg?: MediaType;
    /**
     * Hompage - maximal 128 characters
     */
    hp?: string;
    /**
     * Send Rule - must be a valid regex expression (mind the correct escape sequences)
     */
    sr?: string;
    /**
     * A reference to a Signum Alias
     */
    al?: string;
    /**
     * An IPFS CID reference to more (off-chain) data
     */
    xt?: string;
    /**
     * A list of social media links, maximal 3 URLs, with at maximum 92 characters length
     */
    sc?: string[];

    /**
     * Custom inline extensions...
     */
    [other: string]: unknown;
}
