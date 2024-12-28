/**
 * Original work Copyright (c) 2022 Signum Network
 */

/**
 * Asset Account
 *
 * @category entities
 */
export interface AssetAccount {
    account: string;
    accountRS: string;
    isTreasury: boolean;
    asset: string;
    quantityQNT: string;
    unconfirmedQuantityQNT: string;
}
