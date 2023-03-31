import {
    TransactionEscrowSubtype,
    TransactionPaymentSubtype,
    TransactionType
} from '../../constants';
import {Amount} from '@signumjs/util';
import {getRecipientsAmount} from '../getRecipientsAmount';

describe('getRecipientsAmount', () => {

    const recipientId = `123`;

    it('receives correct amount from ordinary payment transaction', () => {

        const transaction = {
            transaction: '1',
            amountNQT: Amount.fromSigna(100).getPlanck(),
            type: TransactionType.Payment,
            subtype: TransactionPaymentSubtype.Ordinary,
        };

        const amount = getRecipientsAmount(recipientId, transaction);
        expect(amount.getSigna()).toBe('100');

    });

    it('receives correct amount from any kind transaction, but multi out', () => {

        const transaction = {
            transaction: '1',
            amountNQT: Amount.fromSigna(100).getPlanck(),
            type: TransactionType.Escrow,
            subtype: TransactionEscrowSubtype.EscrowCreation,
        };

        const amount = getRecipientsAmount(recipientId, transaction);
        expect(amount.getSigna()).toBe('100');

    });

    it('receives correct amount from multi out same transaction', () => {

        const transaction = {
            transaction: '1',
            amountNQT: Amount.fromSigna(150).getPlanck(),
            type: TransactionType.Payment,
            subtype: TransactionPaymentSubtype.MultiOutSameAmount,
            attachment: {
                'version.MultiSameOutCreation': 1,
                recipients: [recipientId, '456', recipientId] // tests also multiple mentions
            }
        };

        const amount = getRecipientsAmount(recipientId, transaction);
        expect(amount.getSigna()).toBe('100');

    });

    it('receives correct amount from multi out same transaction with very low value', () => {

        const transaction = {
            transaction: '1',
            amountNQT: 10,
            type: TransactionType.Payment,
            subtype: TransactionPaymentSubtype.MultiOutSameAmount,
            attachment: {
                'version.MultiSameOutCreation': 1,
                recipients: [recipientId, '456', recipientId] // tests also multiple mentions
            }
        };

        const amount = getRecipientsAmount(recipientId, transaction);
        expect(amount.getSigna()).toBe('0.00000006');

    });

    it('receives correct amount from multi out diff transaction', () => {

        const transaction = {
            transaction: '1',
            amountNQT: Amount.fromSigna(160).getPlanck(),
            type: TransactionType.Payment,
            subtype: TransactionPaymentSubtype.MultiOut,
            attachment: {
                'version.MultiOutCreation': 1,
                // tests also multiple mentions
                recipients: [
                    [recipientId, Amount.fromSigna(100).getPlanck()],
                    ['456', Amount.fromSigna(10).getPlanck()],
                    [recipientId, Amount.fromSigna(50).getPlanck()],
                ]
            }
        };

        const amount = getRecipientsAmount(recipientId, transaction);
        expect(amount.getSigna()).toBe('150');

    });

    it('receives zero amount from multi out as not being recipient', () => {

        const transaction = {
            transaction: '1',
            amountNQT: Amount.fromSigna(110).getPlanck(),
            type: TransactionType.Payment,
            subtype: TransactionPaymentSubtype.MultiOut,
            attachment: {
                'version.MultiOutCreation': 1,
                recipients: [
                    ['789', Amount.fromSigna(100).getPlanck()],
                    ['456', Amount.fromSigna(10).getPlanck()],
                ]
            }
        };

        const amount = getRecipientsAmount(recipientId, transaction);
        expect(amount.getSigna()).toBe('0');

    });

});
