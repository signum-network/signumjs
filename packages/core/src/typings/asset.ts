/**
 * Original work Copyright (c) 2019 Burst Apps Team
 * Modified (c) 2022 Signum Network
 */

/**
 * Asset
 *
 * The Signum Asset/Token Exchange is a built-in peer-to-peer exchange integrated into the Signum Network.
 * It allows fast, secure, and decentralized trading of cryptographic digital tokens.
 * Because of its decentralized nature, there’s no need for outside organizations or agencies
 * to meddle with its affairs, resulting in improved efficiency and reduced costs.
 * @module core
 */
export interface Asset {
    account: string;
    accountRS: string;
    issuer: string;
    issuerRS: string;
    publicKey: string;
    name: string;
    description: string;
    decimals: number;
    quantityQNT: string;
    quantityCirculatingQNT: string;
    quantityBurntQNT: string;
    asset: string;
    mintable: boolean;
    numberOfTrades: number;
    numberOfTransfers: number;
    numberOfAccounts: number;
    volumeQNT: string;
    priceHigh: string;
    priceLow: string;
    priceOpen: string;
    priceClose: string;
}
