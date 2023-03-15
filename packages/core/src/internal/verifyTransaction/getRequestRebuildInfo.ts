/** @ignore */
/** @internal */

import {BaseTransaction} from './baseTransaction';

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
    {type: 1, subtype: 8, requestType: 'setTLD', hasAttachment: true},
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
    {type: 2, subtype: 10, requestType: 'transferAssetOwnership', hasAttachment: false},
    {type: 20, subtype: 0, requestType: 'setRewardRecipient', hasAttachment: false},
    {type: 20, subtype: 1, requestType: 'addCommitment', hasAttachment: true},
    {type: 20, subtype: 2, requestType: 'removeCommitment', hasAttachment: true},
    {type: 21, subtype: 0, requestType: 'sendMoneyEscrow', hasAttachment: true},
    {type: 21, subtype: 1, requestType: 'escrowSign', hasAttachment: true},
    {type: 21, subtype: 3, requestType: 'sendMoneySubscription', hasAttachment: true},
    {type: 21, subtype: 4, requestType: 'subscriptionCancel', hasAttachment: true},
    {type: 22, subtype: 0, requestType: 'createATProgram', hasAttachment: true},
];

export function getRequestRebuildInfo(tx: BaseTransaction) {
    const requestType =  DecodeRequestType.find(t => t.type === tx.type && t.subtype === tx.subtype);
    if (!requestType) {
        throw new Error(`Unsupported transaction type '${tx.type}' subtype '${tx.subtype}'.`);
    }
    return requestType;
}
