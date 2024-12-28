
/**
 * Copyright (c) 2019 Burst Apps Team
 */

/**
 * Peer Interface
 * @category entities
 * */
export interface Peer {
    announcedAddress: string;
    application: string;
    blacklisted: boolean;
    downloadedVolume: number;
    lastUpdated: number;
    platform: string;
    requestProcessingTime: number;
    shareAddress: boolean;
    state: number;
    uploadedVolume: boolean;
    version: string;
}
