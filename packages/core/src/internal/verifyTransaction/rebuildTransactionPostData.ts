/** @ignore */
/** @internal */

import BigNumber from 'bignumber.js';
import ByteBuffer from './byteBuffer';

interface BaseTransaction {
    type?: number;
    version?: number;
    subtype?: number;
    timestamp?: number;
    deadline?: number;
    senderPublicKey?: string;
    sender?: string;
    recipient?: string;
    amountNQT?: string;
    feeNQT?: string;
    referencedTransactionFullHash?: string;
    signature?: string;
    flags?: number;
    ecBlockHeight?: number;
    ecBlockId?: string;
    cashBackId?: string;
}

interface AttachmentFields {
    type: string;
    parameterName?: string;
}

interface AttachmentSpec {
    request: string;
    fields: AttachmentFields[];
}

/**
 * Try to rebuild the form data based on unsignedBytes in a response.
 * @param hexUnsignedBytes string with unsignedBytes
 * @returns Any object, expected to match the form data
 * @throws Error on failure
 * @internal
 */
export function rebuildTransactionPostData(hexUnsignedBytes: string) {
    const trBytes = new ByteBuffer(hexUnsignedBytes);
    const transaction = parseBaseTransaction(trBytes);
    let rebuiltData: any = {};

    rebuiltData.feeNQT = transaction.feeNQT;
    rebuiltData.publicKey = transaction.senderPublicKey;
    rebuiltData.deadline = transaction.deadline;
    if (transaction.amountNQT) { rebuiltData.amountNQT = transaction.amountNQT; }
    if (transaction.recipient) { rebuiltData.recipient = transaction.recipient; }
    if (transaction.referencedTransactionFullHash) {
        rebuiltData['referencedTransactionFullHash'] = transaction.referencedTransactionFullHash;
    }

    const foundRequest = decodeRequestType.find(Obj => Obj.type === transaction.type && Obj.subtype === transaction.subtype);
    if (!foundRequest) {
        throw new Error(`Unsupported transaction type '${transaction.type}' subtype '${transaction.subtype}'.`);
    }
    if (foundRequest.hasAttachment) {
        rebuiltData = parseAttachment(foundRequest.requestType, rebuiltData, trBytes);
        // Some exceptions
        switch (foundRequest.requestType) {
        case 'sendMoneyMultiSame':
            rebuiltData.amountNQT = (new BigNumber(rebuiltData.amountNQT)).dividedBy(rebuiltData.recipients.split(';').length).toFixed(0);
            break;
        case 'issueAsset':
            if (rebuiltData.mintable === '1') {
                rebuiltData.mintable = 'true';
            } else {
                rebuiltData.mintable = 'false';
            }
            break;
        case 'createATProgram':
            delete rebuiltData.creationBytes;
            if (rebuiltData.referencedTransactionFullHash) {
                delete rebuiltData.code;
                if (rebuiltData.data === '') { delete rebuiltData.data; }
                delete rebuiltData.dpages;
                delete rebuiltData.cspages;
                delete rebuiltData.uspages;
                delete rebuiltData.minActivationAmountNQT;
            }
        }
    }

    rebuiltData = parseMessage(transaction.flags, rebuiltData, trBytes);
    rebuiltData = parseEncryptedMessage(transaction.flags, rebuiltData, trBytes);
    rebuiltData = parseRecipientPublicKey(transaction.flags, rebuiltData, trBytes);
    rebuiltData = parseEncryptToSelfMessage(transaction.flags, rebuiltData, trBytes);

    return {
        requestType: foundRequest.requestType,
        rebuiltData,
    };
}

/**
 * From a given trByteBuffer, parse the transaction fields common for all
 * kinds of transactions. Returns an incomplete Transaction object
 */
function parseBaseTransaction(trByteBuffer: ByteBuffer): BaseTransaction {
    const transactionJSON: BaseTransaction = {};
    transactionJSON.type = trByteBuffer.readByte();
    const subtypeAndVersion = trByteBuffer.readByte();
    transactionJSON.subtype = subtypeAndVersion & 0x0F;
    transactionJSON.version = (subtypeAndVersion & 0xF0) >> 4;
    if (transactionJSON.version < 2) {
        throw new Error('Unsupported transaction version.');
    }
    transactionJSON.timestamp = trByteBuffer.readInt();
    transactionJSON.deadline = trByteBuffer.readShort();
    transactionJSON.senderPublicKey = trByteBuffer.readHexString(32);
    transactionJSON.recipient = trByteBuffer.readLong().toString();
    if (transactionJSON.recipient === '0') {
        delete transactionJSON.recipient;
    }
    transactionJSON.amountNQT = trByteBuffer.readLong().toString();
    if (transactionJSON.amountNQT === '0') {
        delete transactionJSON.amountNQT;
    }
    transactionJSON.feeNQT = trByteBuffer.readLong().toString();
    transactionJSON.referencedTransactionFullHash = trByteBuffer.readHexString(32);
    if (/^0+$/.test(transactionJSON.referencedTransactionFullHash)) {
        delete transactionJSON.referencedTransactionFullHash;
    }
    transactionJSON.signature = trByteBuffer.readHexString(64);
    if (/^0+$/.test(transactionJSON.signature)) {
        delete transactionJSON.signature;
    }
    transactionJSON.flags = trByteBuffer.readInt();
    transactionJSON.ecBlockHeight = trByteBuffer.readInt();
    transactionJSON.ecBlockId = trByteBuffer.readLong().toString();
    transactionJSON.cashBackId = trByteBuffer.readLong().toString();
    return transactionJSON;
}

/**
 * Updates the incoming 'data' object (rebuiltData) accordingly the 'requestType'
 * and bytes from 'trBytes'.
 * @return the updated object.
 * @throw Error on failure
 */
function parseAttachment(requestType: string, data: any, trBytes: ByteBuffer) {
    let spec: AttachmentSpec;
    const attachmentVersion = trBytes.readByte();
    switch (attachmentVersion) {
    case 1:
        spec = attachmentSpecV1.find(obj => obj.request === requestType);
        break;
    case 2:
        spec = attachmentSpecV2.find(obj => obj.request === requestType);
        break;
    }
    if (!spec) {
        throw new Error(`Attachment specification not found for transaction type '${requestType}', version '${attachmentVersion}'.`);
    }
    const pastValues: string[] = [];
    let sizeOfString: number;
    for (const item of spec.fields) {
        const itemType = item.type.split('*');
        const typeSpec = itemType[0];
        const repetitionSpec = itemType[1];
        let repetition: number;
        if (repetitionSpec.startsWith('$')) {
            // variable repetition, depending on previous element
            const repVal = parseInt(repetitionSpec.substring(1), 10);
            repetition = parseInt(pastValues[repVal], 10);
        } else {
            // fixed repetition
            repetition = parseInt(repetitionSpec, 10);
        }
        const currentValues: string[] = [];
        for (let amount = 0; amount < repetition; amount++ ) {
            switch (typeSpec) {
            case 'ByteString':
                sizeOfString = trBytes.readByte();
                currentValues.push(trBytes.readString(sizeOfString));
                break;
            case 'ShortString':
                sizeOfString = trBytes.readShort();
                currentValues.push(trBytes.readString(sizeOfString));
                break;
            case 'Long:Long':
                currentValues.push(
                    trBytes.readLong().toString() +
                    ':' +
                    trBytes.readLong().toString()
                );
                break;
            case 'Long':
                currentValues.push(trBytes.readLong().toString());
                break;
            case 'Int':
                currentValues.push(trBytes.readInt().toString());
                break;
            case 'Short':
                currentValues.push(trBytes.readShort().toString());
                break;
            case 'Byte':
                currentValues.push(trBytes.readByte().toString());
                break;
            case 'Delete':
                break;
            case 'CreationBytes':
                Object.assign(data, parseCreationBytes(trBytes));
                break;
            default:
                throw new Error('Internal error');
            }
        }
        if (item.parameterName && (currentValues.length !== 1 || currentValues[0] !== '0')) {
            // Only add property if it is not zero!
            data[item.parameterName] = currentValues.join(';');
        }
        if (typeSpec === 'Delete') {
            delete data[item.parameterName];
        }
        pastValues.push(currentValues.toString());
    }
    return data;
}

function parseCreationBytes(trBytes: ByteBuffer) {
    const initialPos = trBytes.position();

    const version = trBytes.readShort();
    if (version !== 3 && version !== 2) {
        throw new Error('Incorrect version for creationBytes');
    }

    const _reserved = trBytes.readShort();
    const codePages = trBytes.readShort();
    const dpages = trBytes.readShort();
    const cspages = trBytes.readShort();
    const uspages = trBytes.readShort();
    const minActivationAmountNQT = trBytes.readLong().toString();

    let codeLen = (codePages <= 1) ? trBytes.readByte() : trBytes.readShort();
    if (codeLen === 0 && codePages === 1 && version > 2) {
        codeLen = 256;
    }
    const code = trBytes.readHexString(codeLen);

    let dataLen = (dpages <= 1) ? trBytes.readByte() : trBytes.readShort();
    if (dataLen === 0 && dpages === 1 && trBytes.length() - trBytes.position() === 256 && version > 2) {
        // Note: Could not work if there are attachments: message, messagemessageToEncrypt
        // encryptedMessageData, messageToEncryptToSelf or encryptToSelfMessageData.
        // The problem is that creationBytes has no size information.
        // This is not a problem in node because the attachments with flags are stored
        // in different fields in the database, so the creationBytes size can be calculated.
        dataLen = 256;
    }
    const data = trBytes.readHexString(dataLen);

    const creationBytesLen = trBytes.position() - initialPos;
    trBytes.position(initialPos);
    const creationBytes = trBytes.readHexString(creationBytesLen);

    const retObj = {
        creationBytes,
        code,
        data,
        dpages: dpages.toString(),
        cspages: cspages.toString(),
        uspages: cspages.toString(),
        minActivationAmountNQT
    };
    if (retObj.code === '') { delete retObj.code; }
    if (retObj.data === '') { delete retObj.data; }
    if (retObj.dpages === '0') { delete retObj.dpages; }
    if (retObj.cspages === '0') { delete retObj.cspages; }
    if (retObj.uspages === '0') { delete retObj.uspages; }
    return retObj;
}


function parseMessage (transactionFlags: number, data: any, trBytes: ByteBuffer) {
    // flag for non-encrypted message
    const flagBit = 0b1;
    if ((transactionFlags & flagBit) === 0) {
        return data;
    }
    const attachmentVersion = trBytes.readByte();
    if (attachmentVersion !== 1) {
        throw new Error(`Unsupported 'message' flag.`);
    }
    const lengthBytes = trBytes.readInt();
    const messageIsText = (lengthBytes & 0x80000000) !== 0;
    const messageLength = (lengthBytes & 0x7fffffff);
    if (messageIsText) {
        data.message = trBytes.readString(messageLength);
    } else {
        data.message = trBytes.readHexString(messageLength);
    }
    data.messageIsText = messageIsText ? 'true' : 'false';
    return data;
}

function parseEncryptedMessage (transactionFlags: number, data: any, trBytes: ByteBuffer) {
    // flag for encrypted note
    const flagBit = 0b10;
    if ((transactionFlags & flagBit) === 0) {
        return data;
    }
    const attachmentVersion = trBytes.readByte();
    if (attachmentVersion !== 1) {
        throw new Error(`Unsupported 'EncryptedMessage' flag.`);
    }
    const lengthBytes = trBytes.readInt();
    data.messageToEncryptIsText = (lengthBytes & 0x80000000) ? 'true' : 'false';
    const messageLength = (lengthBytes & 0x7fffffff);

    data.encryptedMessageData = trBytes.readHexString(messageLength);
    data.encryptedMessageNonce = trBytes.readHexString(32);
    return data;
}

function parseRecipientPublicKey (transactionFlags: number, data: any, trBytes: ByteBuffer) {
    // flag for encrypted note
    const flagBit = 0b100;
    if ((transactionFlags & flagBit) === 0) {
        return data;
    }
    const attachmentVersion = trBytes.readByte();
    if (attachmentVersion !== 1) {
        throw new Error(`Unsupported 'RecipientPublicKey' flag.`);
    }
    data.recipientPublicKey = trBytes.readHexString(32);
    return data;
}

function parseEncryptToSelfMessage (transactionFlags: number, data: any, trBytes: ByteBuffer) {
    const flagBit = 0b1000;
    if ((transactionFlags & flagBit) === 0) {
        return data;
    }
    const attachmentVersion = trBytes.readByte();
    if (attachmentVersion !== 1) {
        throw new Error(`Unsupported 'EncryptedMessage' flag.`);
    }
    const lengthBytes = trBytes.readInt();
    data.messageToEncryptToSelfIsText = (lengthBytes & 0x80000000) ? 'true' : 'false';
    const messageLength = (lengthBytes & 0x7fffffff);
    data.encryptToSelfMessageData = trBytes.readHexString(messageLength);
    data.encryptToSelfMessageNonce = trBytes.readHexString(32);
    return data;
}

/** From a transaction type/subtype, returns the original requestType */
const decodeRequestType = [
    { type: 0, subtype: 0, requestType: 'sendMoney', hasAttachment: false },
    { type: 0, subtype: 1, requestType: 'sendMoneyMulti', hasAttachment: true },
    { type: 0, subtype: 2, requestType: 'sendMoneyMultiSame', hasAttachment: true },
    { type: 1, subtype: 0, requestType: 'sendMessage', hasAttachment: false },
    { type: 1, subtype: 1, requestType: 'setAlias', hasAttachment: true },
    { type: 1, subtype: 5, requestType: 'setAccountInfo', hasAttachment: true },
    { type: 1, subtype: 6, requestType: 'sellAlias', hasAttachment: true },
    { type: 1, subtype: 7, requestType: 'buyAlias', hasAttachment: true },
    { type: 2, subtype: 0, requestType: 'issueAsset', hasAttachment: true },
    { type: 2, subtype: 1, requestType: 'transferAsset', hasAttachment: true },
    { type: 2, subtype: 2, requestType: 'placeAskOrder', hasAttachment: true },
    { type: 2, subtype: 3, requestType: 'placeBidOrder', hasAttachment: true },
    { type: 2, subtype: 4, requestType: 'cancelAskOrder', hasAttachment: true },
    { type: 2, subtype: 5, requestType: 'cancelBidOrder', hasAttachment: true },
    { type: 2, subtype: 6, requestType: 'mintAsset', hasAttachment: true },
    { type: 2, subtype: 7, requestType: 'addAssetTreasuryAccount', hasAttachment: false },
    { type: 2, subtype: 8, requestType: 'distributeToAssetHolders', hasAttachment: true },
    { type: 2, subtype: 9, requestType: 'transferAssetMulti', hasAttachment: true },
    { type: 20, subtype: 0, requestType: 'setRewardRecipient', hasAttachment: false },
    { type: 20, subtype: 1, requestType: 'addCommitment', hasAttachment: true },
    { type: 20, subtype: 2, requestType: 'removeCommitment', hasAttachment: true },
    { type: 21, subtype: 0, requestType: 'sendMoneyEscrow', hasAttachment: true },
    { type: 21, subtype: 1, requestType: 'escrowSign', hasAttachment: true },
    { type: 21, subtype: 3, requestType: 'sendMoneySubscription', hasAttachment: true },
    { type: 21, subtype: 4, requestType: 'subscriptionCancel', hasAttachment: true },
    { type: 22, subtype: 0, requestType: 'createATProgram', hasAttachment: true },
];

const attachmentSpecV1: AttachmentSpec[] = [
    { request: 'sendMoneyMulti', fields: [
        { type: 'Byte*1' },
        { type: 'Long:Long*$0',  parameterName: 'recipients' },
        { type: 'Delete*1',  parameterName: 'amountNQT' }
    ] },
    { request: 'sendMoneyMultiSame', fields: [
        { type: 'Byte*1' },
        { type: 'Long*$0',  parameterName: 'recipients' },
    ] },
    { request: 'setAlias', fields: [
        { type: 'ByteString*1',  parameterName: 'aliasName' },
        { type: 'ShortString*1',  parameterName: 'aliasURI' },
    ] },
    { request: 'setAccountInfo', fields: [
        { type: 'ByteString*1',  parameterName: 'name' },
        { type: 'ShortString*1',  parameterName: 'description' },
    ] },
    { request: 'sellAlias', fields: [
        { type: 'ByteString*1',  parameterName: 'aliasName' },
        { type: 'Long*1',  parameterName: 'priceNQT' },
    ] },
    { request: 'buyAlias', fields: [
        { type: 'ByteString*1',  parameterName: 'aliasName' },
        { type: 'Delete*1',  parameterName: 'recipient' }
    ] },
    { request:  'issueAsset', fields: [
        { type: 'ByteString*1', parameterName: 'name' },
        { type: 'ShortString*1', parameterName: 'description' },
        { type: 'Long*1', parameterName: 'quantityQNT' },
        { type: 'Byte*1', parameterName: 'decimals' },
    ] },
    { request:  'transferAsset', fields: [
        { type: 'Long*1', parameterName: 'asset' },
        { type: 'Long*1', parameterName: 'quantityQNT' }
    ] },
    { request:  'placeAskOrder', fields: [
        { type: 'Long*1', parameterName: 'asset' },
        { type: 'Long*1', parameterName: 'quantityQNT' },
        { type: 'Long*1', parameterName: 'priceNQT' }
    ] },
    { request:  'placeBidOrder', fields: [
        { type: 'Long*1', parameterName: 'asset' },
        { type: 'Long*1', parameterName: 'quantityQNT' },
        { type: 'Long*1', parameterName: 'priceNQT' }
    ] },
    { request:  'cancelAskOrder', fields: [
        { type: 'Long*1', parameterName: 'order' }
    ] },
    { request:  'cancelBidOrder', fields: [
        { type: 'Long*1', parameterName: 'order' }
    ] },
    { request:  'mintAsset', fields: [
        { type: 'Long*1', parameterName: 'asset' },
        { type: 'Long*1', parameterName: 'quantityQNT' },
    ] },
    { request:  'distributeToAssetHolders', fields: [
        { type: 'Long*1', parameterName: 'asset' },
        { type: 'Long*1', parameterName: 'quantityMinimumQNT' },
        { type: 'Long*1', parameterName: 'assetToDistribute' },
        { type: 'Long*1', parameterName: 'quantityQNT' }
    ] },
    { request:  'transferAssetMulti', fields: [
        { type: 'Byte*1' },
        { type: 'Long:Long*$0', parameterName: 'assetIdsAndQuantities' }
    ] },
    { request:  'addCommitment', fields: [
        { type: 'Long*1', parameterName: 'amountNQT' }
    ] },
    { request:  'removeCommitment', fields: [
        { type: 'Long*1', parameterName: 'amountNQT' }
    ] },
    { request:  'sendMoneySubscription', fields: [
        { type: 'Int*1', parameterName: 'frequency' }
    ] },
    { request:  'subscriptionCancel', fields: [
        { type: 'Long*1', parameterName: 'subscription' }
    ] },
    { request:  'createATProgram', fields: [
        { type: 'ByteString*1', parameterName: 'name' },
        { type: 'ShortString*1', parameterName: 'description' },
        { type: 'CreationBytes*1' },
    ] }
];

const attachmentSpecV2: AttachmentSpec[] = [
    { request: 'issueAsset', fields: [
        { type: 'ByteString*1', parameterName: 'name' },
        { type: 'ShortString*1', parameterName: 'description' },
        { type: 'Long*1', parameterName: 'quantityQNT' },
        { type: 'Byte*1', parameterName: 'decimals' },
        { type: 'Byte*1', parameterName: 'mintable' }
    ] }
];
