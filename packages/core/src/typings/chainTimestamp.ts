/**
 * Original work Copyright (c) 2019 Burst Apps Team
 */

/**
 * ChainTime Interface
 * @see {@link util.ChainTime} to convert between chains timestamp and Date
 * @category entities
 * */
export interface ChainTimestamp {
    /**
     * The chains time (in seconds since the genesis block)
     */
    readonly time: number;
}
