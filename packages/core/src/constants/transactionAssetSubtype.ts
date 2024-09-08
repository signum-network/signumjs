/**
 * Original work Copyright (c) 2019 Burst Apps Team
 * Modified work Copyright (c) 2023 Signum Network
 */

/**
 * Constants for asset subtypes
 * 
 * @category transaction-types
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
    AssetMultiTransfer,
    AssetTransferOwnership
}

