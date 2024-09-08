/**
 * Copyright (c) 2022 Signum Network
 */

/**
 * Type for media data used in SRC44
 *
 * @category SRC44
 */
export interface IpfsMediaType {
    /**
     * IPFS CID
     */
    ipfsCid: string;
    /**
     * Mime Type, e.g. image/png
     */
    mimeType: string;
}
