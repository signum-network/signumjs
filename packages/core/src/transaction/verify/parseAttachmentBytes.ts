/**
 * @internal
 */
import {Attachment} from '../../typings/attachment';
import {TransactionPaymentSubtype, TransactionType} from '../../constants';
import {parseAttachmentBytesSinglePayment} from './attachmentBytesParser/parseAttachmentBytesSinglePayment';
import {hexToNumber} from './converter';

interface ParseAttachmentBytesArgs {
    type: number;
    subtype: number;
    attachmentBytesHex: string;
}

export const parseAttachmentBytes = ({
                                         type,
                                         subtype,
                                         attachmentBytesHex
                                     }: ParseAttachmentBytesArgs): Attachment | undefined => {

    const version = hexToNumber(attachmentBytesHex.substr(0, 2));
    if (type === TransactionType.Payment) {
        if (subtype === TransactionPaymentSubtype.Ordinary) {
            return parseAttachmentBytesSinglePayment({version, attachmentBytesHex});
        }
    }

    return undefined;
};
