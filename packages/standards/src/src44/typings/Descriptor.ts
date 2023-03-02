/**
 * Copyright (c) 2022 Signum Network
 */
import {SRC44DescriptorType} from './SRC44DescriptorType';
import {IpfsMediaType} from './IpfsMediaType';

/**
 * Human friendly descriptor structure
 *
 * See [[SRC44Descriptor]], [[DescriptorData]] and [[DescriptorDataBuilder]] to create, update this structure
 *
 * @module standards.SRC44
 */
export interface Descriptor {
    /**
     * Version Number - Should be 1 for now
     */
    version: number;
    /**
     * Name, maximal 24 characters
     */
    name?: string;
    /**
     * Description, maximal 384 characters
     */
    description?: string;
    /**
     * Descriptor type
     */
    type?: SRC44DescriptorType;
    /**
     * IPFS Media Link for the Avatar
     */
    avatar?: IpfsMediaType;
    /**
     * IPFS Media Link for the background image
     */
    background?: IpfsMediaType;
    /**
     * Homepage - maximal 128 characters
     */
    homePage?: string;
    /**
     * Send Rule - must be a valid regex expression (mind the correct escape sequences)
     */
    sendRule?: RegExp;
    /**
     * A reference to a Signum Alias
     */
    alias?: string;
    /**
     * A reference to a Signum Account
     */
    account?: string;
    /**
     * An arbitrary identifier, i.e. external reference - max 48 characters
     */
    id?: string;
    /**
     * The resolved Descriptor data from a referenced alias
     */
    resolvedAlias?: Descriptor;
    /**
     * An IPFS CID reference to more (off-chain) data
     */
    extension?: string;
    /**
     * A list of social media links, maximal 3 URLs, with at maximum 92 characters length
     */
    socialMediaLinks?: string[];

    /**
     * Custom inline extensions...
     */
    [other: string]: unknown;
}
