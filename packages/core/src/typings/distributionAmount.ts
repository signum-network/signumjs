/**
 * Original work Copyright (c) 2022 Signum Network
 */


/**
 * @module core
 */
export interface DistributionAmount {
    /**
     * Signa amount of distribution expressed in Planck
     */
    amountNQT: string;
    /**
     * The quantity of the additional asset that was distributed
     */
    quantityQNT: string;
    height: number;
    confirmations: number;
    requestProcessingTime: number;
    account: string;
    transaction: string;
}
