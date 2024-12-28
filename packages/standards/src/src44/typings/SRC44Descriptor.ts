/**
 * Copyright (c) 2022 Signum Network
 */
import { SRC44DescriptorType } from './SRC44DescriptorType';

interface MediaType {
    [key: string]: string;
}

/**
 * SRC44 Compliant descriptor structure
 *
 * See {@link DescriptorData} and {@link DescriptorDataBuilder} to create, update this structure
 *
 * 
 */
export interface SRC44Descriptor {
    /**
     * Version Number - Should be 1 for now
     */
    vs: number;
    /**
     * Name, maximal 24 characters
     */
    nm?: string;
    /**
     * Description, maximal 384 characters
     */
    ds?: string;
    /**
     * Descriptor type
     */
    tp?: SRC44DescriptorType;
    /**
     * IPFS Media Link for the Avatar
     */
    av?: MediaType;
    /**
     * IPFS Media Link for the background image
     */
    bg?: MediaType;
    /**
     * Homepage - maximal 128 characters
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
     * A reference to a Signum Account Id
     */
    ac?: string;
    /**
     * A reference to an arbitrary identifer, i.e. external reference
     */
    id?: string;
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
