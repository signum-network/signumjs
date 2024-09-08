/**
 * Original work Copyright (c) 2019 Burst Apps Team
 */

/**
 * Suggested fees (in Planck)
 * @category entities
 * */
export interface SuggestedFees {
    minimum: number;
    standard: number;
    cheap: number;
    priority: number;
    requestProcessingTime: number;
}
