import {convertHexStringToByteArray, convertNumberToNQTString} from '@signumjs/util';
import {getRecipientsAmount} from '../getRecipientsAmount';
import {parseTransactionBytes} from '../parseTransactionBytes';


describe('parseTransactionBytes', () => {

    it('creates a correct tx object from transaction bytes', () => {
        const transaction = parseTransactionBytes('00107250880da0057210b8941929030324540238450e985899989a7ad0267e0c76f668fde3b1016b0822eb07b777572100e1f50500000000608561040000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000295e0500247826166430d2c5010c00008054657374204d657373616765');
        expect(transaction.senderPublicKey).toBe('7210b8941929030324540238450e985899989a7ad0267e0c76f668fde3b1016b');
        expect(transaction.ecBlockHeight).toBe(0);
        expect(transaction.ecBlockId).toBe('0');
        expect(transaction.subtype).toBe(0);
        expect(transaction.type).toBe(0);
        expect(transaction.recipient).toBe('2402520554221019656');
        expect(transaction.amountNQT).toBe('100000000');
        expect(transaction.feeNQT).toBe('73500000');
        expect(transaction.deadline).toBe(1440);
    });
    it('throws error on invalid transaction bytes', () => {
        const t = parseTransactionBytes('00107250880da00572');
        expect(() => {
            const t = parseTransactionBytes('00107250880da00572');
        }).toThrow("Invalid Transaction Bytes")
    });

});
