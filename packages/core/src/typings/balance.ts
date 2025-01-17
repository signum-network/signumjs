/**
 * Original work Copyright (c) 2019 Burst Apps Team
 */

/**
 * Account Balance
 *
 * @category entities
 */
export interface Balance {
    readonly unconfirmedBalanceNQT: string;
    readonly guaranteedBalanceNQT: string;
    readonly effectiveBalanceNXT: string; // is really NXT!!
    readonly forgedBalanceNQT: string;
    readonly balanceNQT: string;
    readonly requestProcessingTime: number;
}
