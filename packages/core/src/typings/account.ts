/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 * Modified work Copyright (c) 2022 Signum Network
 */

import { AssetBalance } from './assetBalance';
import { UnconfirmedAssetBalance } from './unconfirmedAssetBalance';

/**
* The Signum account interface
 *
 * @category entities
*/
export interface Account {
    account: string;
    accountRS: string;
    /**
     * The extended address carries the public key base36 encoded
     */
    accountRSExtended: string;
    /**
     * The total token balances (in quantity) which this account owns, including reserved ones
     */
    assetBalances: AssetBalance[];
    /**
     * The overall balance, including commitment and reserved orders in Planck.
     */
    balanceNQT: string;
    description: string;
    /**
     * The balance forged by you (Solo-Mining only in Planck
     */
    forgedBalanceNQT: string;
    /**
     * The overall balance, including commitment and reserved orders in Planck.
     */
    guaranteedBalanceNQT: string;
    /**
     * The total committed balance in Planck.
     */
    committedBalanceNQT: string;
    /**
     * The accounts commitment estimate per TiB.
     */
    commitmentNQT: string;
    /**
     * The public key. If an account does not have a public key it is considered inactive and though less secure.
     * Public Key is being assigned by outgoing transactions or if receiving an transaction with assigned (and mathgcing) public key
     */
    publicKey: string;
    name: string;
    unconfirmedAssetBalances: UnconfirmedAssetBalance[];
    /**
     * The currently available balance in Planck, without commitment and open orders
     */
    unconfirmedBalanceNQT: string;
    /**
     * Determines whether the account is a smart contract (aka AT) or not
     */
    isAT: boolean;

    /**
     * Determines whether the account is secured, i.e. has public key assigned, or not
     */
    isSecured: boolean;
}
