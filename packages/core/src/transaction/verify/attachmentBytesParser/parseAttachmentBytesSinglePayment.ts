import {Attachment, AttachmentMessage} from '../../../typings/attachment';
import {hexToNumber} from '../converter';
import {convertHexStringToString} from '@signumjs/util';

interface Args {
    version: number;
    attachmentBytesHex: string;
}

const MaxInt = 2147483647;

export const parseAttachmentBytesSinglePayment = ({attachmentBytesHex}: Args): Attachment => {
    let messageLength = hexToNumber(attachmentBytesHex.substr(2, 8)) & MaxInt;
    const messageIsText = messageLength > 0;
    messageLength = messageIsText ? messageLength : messageLength & MaxInt;
    let message = attachmentBytesHex.substr(10, messageLength * 2);

    if (messageIsText) {
        message = convertHexStringToString(message);
    }

    return new AttachmentMessage({
        messageIsText,
        message
    });
};
