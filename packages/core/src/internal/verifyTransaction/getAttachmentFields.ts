/** @ignore */
/** @internal */

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
    ['issueAsset', [
        {type: 'ByteString*1', parameterName: 'name'},
        {type: 'ShortString*1', parameterName: 'description'},
        {type: 'Long*1', parameterName: 'quantityQNT'},
        {type: 'Byte*1', parameterName: 'decimals'},
        {type: 'Byte*1', parameterName: 'mintable'}
    ]],
    ['setAlias', [
        {type: 'ByteString*1', parameterName: 'aliasName'},
        {type: 'ShortString*1', parameterName: 'aliasURI'},
        // this is an id, while it is the name as parameter... need to be skipped on parameter comparison
        {type: 'Long*1', parameterName: 'tld'},
    ]],
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
