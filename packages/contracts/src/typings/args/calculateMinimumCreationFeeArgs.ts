/**
 * Copyright (c) 2022 Signum Network
 */

/**
 *
 * The argument object for [[calculateMinimumCreationFee]]
 *
 * @param hexCode The contracts code in hex form
 * @param hexData The contracts initial data stack in hex form
 * @module contracts
 */
interface CalculateMinimumCreationFeeArgs {
    hexCode?: string;
    hexData?: string;
}
