/**
 * Original work Copyright (c) 2019 Burst Apps Team
 * Modified work Copyright (c) 2022 Signum Network
 */

/**
 * Constants for asset subtypes
 * @module core
 *
 */
export enum TransactionAssetSubtype {
    AssetIssuance = 0,
    AssetTransfer,
    AskOrderPlacement,
    BidOrderPlacement,
    AskOrderCancellation,
    BidOrderCancellation,
    AssetMint,
    AssetAddTreasureyAccount,
    AssetDistributeToHolders,
    AssetMultiTransfer
}

