/** @ignore */
/** @internal */

/** From a transaction type/subtype, returns the original requestType */
const DecodeRequestType = [
    {type: 0, subtype: 0, requestType: 'sendMoney', hasAttachment: false},
    {type: 0, subtype: 1, requestType: 'sendMoneyMulti', hasAttachment: true},
    {type: 0, subtype: 2, requestType: 'sendMoneyMultiSame', hasAttachment: true},
    {type: 1, subtype: 0, requestType: 'sendMessage', hasAttachment: false},
    {type: 1, subtype: 1, requestType: 'setAlias', hasAttachment: true},
    {type: 1, subtype: 5, requestType: 'setAccountInfo', hasAttachment: true},
    {type: 1, subtype: 6, requestType: 'sellAlias', hasAttachment: true},
    {type: 1, subtype: 7, requestType: 'buyAlias', hasAttachment: true},
    {type: 2, subtype: 0, requestType: 'issueAsset', hasAttachment: true},
    {type: 2, subtype: 1, requestType: 'transferAsset', hasAttachment: true},
    {type: 2, subtype: 2, requestType: 'placeAskOrder', hasAttachment: true},
    {type: 2, subtype: 3, requestType: 'placeBidOrder', hasAttachment: true},
    {type: 2, subtype: 4, requestType: 'cancelAskOrder', hasAttachment: true},
    {type: 2, subtype: 5, requestType: 'cancelBidOrder', hasAttachment: true},
    {type: 2, subtype: 6, requestType: 'mintAsset', hasAttachment: true},
    {type: 2, subtype: 7, requestType: 'addAssetTreasuryAccount', hasAttachment: false},
    {type: 2, subtype: 8, requestType: 'distributeToAssetHolders', hasAttachment: true},
    {type: 2, subtype: 9, requestType: 'transferAssetMulti', hasAttachment: true},
    {type: 20, subtype: 0, requestType: 'setRewardRecipient', hasAttachment: false},
    {type: 20, subtype: 1, requestType: 'addCommitment', hasAttachment: true},
    {type: 20, subtype: 2, requestType: 'removeCommitment', hasAttachment: true},
    {type: 21, subtype: 0, requestType: 'sendMoneyEscrow', hasAttachment: true},
    {type: 21, subtype: 1, requestType: 'escrowSign', hasAttachment: true},
    {type: 21, subtype: 3, requestType: 'sendMoneySubscription', hasAttachment: true},
    {type: 21, subtype: 4, requestType: 'subscriptionCancel', hasAttachment: true},
    {type: 22, subtype: 0, requestType: 'createATProgram', hasAttachment: true},
];


interface AttachmentField {
    type: string;
    parameterName?: string;
}

type AttachmentSpec = Map<string, AttachmentField[]>;

const AttachmentSpecV1: AttachmentSpec = new Map<string, AttachmentField[]>([
    ['sendMoneyMulti', [
        {type: 'Byte*1'},
        {type: 'Long:Long*$0', parameterName: 'recipients'},
        {type: 'Delete*1', parameterName: 'amountNQT'}
    ]],
    ['sendMoneyMultiSame', [
        {type: 'Byte*1'},
        {type: 'Long*$0', parameterName: 'recipients'},
    ]],
    ['setAlias', [
        {type: 'ByteString*1', parameterName: 'aliasName'},
        {type: 'ShortString*1', parameterName: 'aliasURI'},
    ]],
    ['setAccountInfo', [
        {type: 'ByteString*1', parameterName: 'name'},
        {type: 'ShortString*1', parameterName: 'description'},
    ]],
    ['sellAlias', [
        {type: 'ByteString*1', parameterName: 'aliasName'},
        {type: 'Long*1', parameterName: 'priceNQT'},
    ]],
    ['buyAlias', [
        {type: 'ByteString*1', parameterName: 'aliasName'},
        {type: 'Delete*1', parameterName: 'recipient'}
    ]],
    ['issueAsset', [
        {type: 'ByteString*1', parameterName: 'name'},
        {type: 'ShortString*1', parameterName: 'description'},
        {type: 'Long*1', parameterName: 'quantityQNT'},
        {type: 'Byte*1', parameterName: 'decimals'},
    ]],
    ['transferAsset', [
        {type: 'Long*1', parameterName: 'asset'},
        {type: 'Long*1', parameterName: 'quantityQNT'}
    ]],
    ['placeAskOrder', [
        {type: 'Long*1', parameterName: 'asset'},
        {type: 'Long*1', parameterName: 'quantityQNT'},
        {type: 'Long*1', parameterName: 'priceNQT'}
    ]],
    ['placeBidOrder', [
        {type: 'Long*1', parameterName: 'asset'},
        {type: 'Long*1', parameterName: 'quantityQNT'},
        {type: 'Long*1', parameterName: 'priceNQT'}
    ]],
    ['cancelAskOrder', [
        {type: 'Long*1', parameterName: 'order'}
    ]],
    ['cancelBidOrder', [
        {type: 'Long*1', parameterName: 'order'}
    ]],
    ['mintAsset', [
        {type: 'Long*1', parameterName: 'asset'},
        {type: 'Long*1', parameterName: 'quantityQNT'},
    ]],
    ['distributeToAssetHolders', [
        {type: 'Long*1', parameterName: 'asset'},
        {type: 'Long*1', parameterName: 'quantityMinimumQNT'},
        {type: 'Long*1', parameterName: 'assetToDistribute'},
        {type: 'Long*1', parameterName: 'quantityQNT'}
    ]],
    ['transferAssetMulti', [
        {type: 'Byte*1'},
        {type: 'Long:Long*$0', parameterName: 'assetIdsAndQuantities'}
    ]],
    ['addCommitment', [
        {type: 'Long*1', parameterName: 'amountNQT'}
    ]],
    ['removeCommitment', [
        {type: 'Long*1', parameterName: 'amountNQT'}
    ]],
    ['sendMoneySubscription', [
        {type: 'Int*1', parameterName: 'frequency'}
    ]],
    ['subscriptionCancel', [
        {type: 'Long*1', parameterName: 'subscription'}
    ]],
    ['createATProgram', [
        {type: 'ByteString*1', parameterName: 'name'},
        {type: 'ShortString*1', parameterName: 'description'},
        {type: 'CreationBytes*1'},
    ]],
]);

const AttachmentSpecV2: AttachmentSpec = new Map<string, AttachmentField[]>([
    [
        'issueAsset', [
        {type: 'ByteString*1', parameterName: 'name'},
        {type: 'ShortString*1', parameterName: 'description'},
        {type: 'Long*1', parameterName: 'quantityQNT'},
        {type: 'Byte*1', parameterName: 'decimals'},
        {type: 'Byte*1', parameterName: 'mintable'}
    ]
    ]
]);


const GetAttachmentFields = {
    '1': AttachmentSpecV1,
    '2': AttachmentSpecV2
};
export function getAttachmentFields(version: number, requestType: string): AttachmentField[] {
    const spec = GetAttachmentFields[version];
    if (!spec) {
        throw new Error(`Attachment specification not found for transaction type '${requestType}', version '${version}'.`);
    }
    return spec.get(requestType);
}
