/**
 * MultioutRecipientAmount interface
 * @see {@link getRecipientAmountsFromMultiOutPayment}
 * @category entities
 */
export interface MultioutRecipientAmount {
    readonly recipient: string;
    readonly amountNQT: string;
}
