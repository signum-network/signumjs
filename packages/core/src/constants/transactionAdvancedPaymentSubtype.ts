/**
 * Original work Copyright (c) 2019 Burst Apps Team
 * Modified 2024, Signum Network
 */

/**
 * Constants for advanced payment subtypes
 *
 * @category transaction-types
 */
export enum TransactionAdvancedPaymentSubtype {
    EscrowCreation = 0,
    EscrowSigning,
    EscrowResult,
    SubscriptionSubscribe,
    SubscriptionCancel,
    SubscriptionPayment,
}

