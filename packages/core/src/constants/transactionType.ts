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
     * {@link TransactionPaymentSubtype}
     */
    Payment = 0,
    /**
     * {@link TransactionArbitrarySubtype}
     */
    Arbitrary = 1,
    /**
     * {@link TransactionAssetSubtype}
     */
    Asset = 2,
    /**
     * {@link TransactionMarketplaceSubtype}
     */
    Marketplace= 3,
    /**
     * {@link TransactionLeasingSubtype}
     */
    Leasing = 4,
    /**
     * {@link TransactionMiningSubtype}
     */
    Mining = 20,
    /**
     * {@link TransactionEscrowSubtype}
     */
    AdvancedPayment = 21,
    /**
     * {@link TransactionSmartContractSubtype}
     */
    SmartContract = 22,
}

