/**
 * Original work Copyright (c) 2019 Burst Apps Team
 */

/**
 * Constants for transaction types
 *
 * The transaction type is part of every {@link Transaction} object
 * and used to distinguish block data. Additionally, to the transaction type
 * a subtype is sent, that specifies the kind of transaction more detailly.
 *
 * @category transaction-types
 */
export enum TransactionType {
    /**
     * @see TransactionPaymentSubtype
     */
    Payment = 0,
    /**
     * @see TransactionArbitrarySubtype
     */
    Arbitrary = 1,
    /**
     * @see TransactionAssetSubtype
     */
    Asset = 2,
    /**
     * @see TransactionMarketplaceSubtype
     */
    Marketplace= 3,
    /**
     * @see TransactionLeasingSubtype
     */
    Leasing = 4,
    /**
     * @see TransactionMiningSubtype
     */
    Mining = 20,
    Escrow = 21,
    AT = 22,
}

