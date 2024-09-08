/**
 * Copyright (c) 2022 Signum Network
 */

/**
 *
 * The argument object for {@link calculateMinimumCreationFee}
 *
 * @param codeHex The contracts code in hex form
 * @param dataHex The contracts initial data stack in hex form
 *
 */
export interface CalculateMinimumCreationFeeArgs {
    codeHex?: string;
    dataHex?: string;
}
