/**
 * Original work Copyright (c) 2021 Signum Network
 */

/**
 * Mining Info
 * @module core
 */
export interface MiningInfo {
    readonly height: string;
    readonly generationSignature: string;
    readonly baseTarget: string;
    readonly averageCommitmentNQT: string;
    readonly lastBlockReward: string;
    readonly timestamp: string;
}
