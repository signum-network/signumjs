/**
 * Original work Copyright (c) 2019 Burst Apps Team
 */

/**
 * Constants for marketplace subtypes
 *
 * @category transaction-types
 */
export enum TransactionMarketplaceSubtype {
    MarketplaceListing = 0,
    MarketplaceRemoval,
    MarketplaceItemPriceChange,
    MarketplaceItemQuantityChange,
    MarketplacePurchase,
    MarketplaceDelivery,
    MarketplaceFeedback,
    MarketplaceRefund
}

