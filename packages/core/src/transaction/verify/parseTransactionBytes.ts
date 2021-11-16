import {Transaction} from '../../typings/transaction';
import {convertHexEndianess, convertHexStringToDecString} from '@signumjs/util';
import {parseAttachmentBytes} from './parseAttachmentBytes';

const _be = (hex: string) => hex.length > 2 ? convertHexEndianess(hex) : hex;
const hexToNumber = (hex: string): number => parseInt(convertHexStringToDecString(_be(hex)), 10);
const hexToDecStr = (hex: string): string => convertHexStringToDecString(_be(hex));

/**
 * Parses a bytewise representation of a transactions
 * @param hexString The hexadecimal format of the byte representation of a transaction
 * @return {Transaction} the parsed transaction object
 * @module core
 */
export const parseTransactionBytes = (hexString: string): Transaction => {
    try {

        const type = hexToNumber(hexString.substr(0, 2));
        const version = hexString.substr(2, 1);
        const subtype = hexToNumber(hexString.substr(3, 1));
        const timestamp = hexString.substr(4, 8);
        const deadline = hexString.substr(12, 4);
        const senderPublicKey = hexString.substr(16, 64);
        const recipientId = hexString.substr(80, 16);
        const amountNQT = hexString.substr(96, 16);
        const feeNQT = hexString.substr(112, 16);
        const referencedTransactionFullHash = hexString.substr(128, 64);
        const signature = hexString.substr(192, 128);
        const flags = hexString.substr(320, 8);
        const ecBlockHeight = hexString.substr(328, 8);
        const ecBlockId = hexString.substr(336, 16);
        const attachmentBytesHex = hexString.substr(352);
        let attachment;
        if (attachmentBytesHex) {
            attachment = parseAttachmentBytes({
                type,
                subtype,
                attachmentBytesHex
            });
        }

        return {
            type,
            subtype,
            version: hexToNumber(version),
            timestamp: hexToNumber(timestamp),
            deadline: hexToNumber(deadline),
            amountNQT: hexToDecStr(amountNQT),
            feeNQT: hexToDecStr(feeNQT),
            recipient: hexToDecStr(recipientId),
            ecBlockHeight: hexToNumber(ecBlockHeight),
            ecBlockId: hexToDecStr(ecBlockId),
            senderPublicKey,
            signature,
            referencedTransactionFullHash,
            attachment
        };
    } catch (e) {
        throw new Error('Invalid Transaction Bytes');
    }
};
