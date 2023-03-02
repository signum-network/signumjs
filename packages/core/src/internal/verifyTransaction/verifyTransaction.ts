/** @ignore */
/** @internal */

import {rebuildTransactionPostData} from './rebuildTransactionPostData';

// Type 0 (payment): OK
// Type 1 (messaging): Missing 'sellAlias', 'buyAlias' (issue)
// Type 2 (colored coins): OK
// Type 3 (digital goods): deprecated (return error?)
// Type 4 (account control): deprecated (return error?)
// Type 20 (mining): OK
// Type 21 (advanced payment): Missing 'sendMoneyEscrow', 'escrowSign'
// Type 22 (automated transactions): OK
const methodsToVerify = new Set([
    'sendMoney', 'sendMoneyMulti', 'sendMoneyMultiSame',
    'sendMessage', 'setAlias', 'setAccountInfo',
    'issueAsset', 'transferAsset', 'placeAskOrder', 'placeBidOrder', 'cancelAskOrder',
    'mintAsset', 'addAssetTreasuryAccount', 'distributeToAssetHolders', 'cancelBidOrder', 'transferAssetMulti',
    'setRewardRecipient', 'addCommitment', 'removeCommitment',
    'sendMoneySubscription', 'subscriptionCancel',
    'createATProgram'
]);

/**
 * @param method Signum API name
 * @param parameters object
 * @param response an HttpResponse
 * @throws Error on failure
 * @internal
 * @module core
 */
export function verifyTransaction(method: string, parameters: any, response: any) {
    if (response.broadcasted === true || response.transactionBytes) {
        // Transaction already signed, nothing to do
        return;
    }
    if (!methodsToVerify.has(method)) {
        // Method not implemented yet
        return;
    }

    const rebuiltObject = rebuildTransactionPostData(response.unsignedTransactionBytes);

    if (method !== rebuiltObject.requestType) {
        throw new Error('Verification failed - Node Response does not match transaction parameters (A)');
    }
    let nParameters = 0;
    // tslint:disable-next-line:forin
    for (const prop in parameters) {
        switch (prop) {
        case 'broadcast':
            // properties to ignore
            continue;
        case 'referencedTransactionFullHash':
        case 'senderPublicKey':
        case 'recipientPublicKey':
        case 'data':
        case 'code':
        case 'encryptedMessageData':
        case 'encryptedMessageNonce':
        case 'encryptToSelfMessageData':
        case 'encryptToSelfMessageNonce':
            // case insensitive properties
            if (String(parameters[prop]).toLocaleLowerCase() !== String(rebuiltObject.rebuiltData[prop]).toLocaleLowerCase()) {
                throw new Error(`Verification failed - Node Response does not match transaction parameter '${prop}'.`);
            }
            break;
        default:
            // case sensitive properties
            if (String(parameters[prop]) !== String(rebuiltObject.rebuiltData[prop])) {
                throw new Error(`Verification failed - Node Response does not match transaction parameter '${prop}'.`);
            }
        }
        if (parameters[prop] !== undefined) {
            nParameters++;
        }
    }
    let nRebuilt = 0;
    // tslint:disable-next-line:forin
    for (const _prop in rebuiltObject.rebuiltData) {
        nRebuilt++;
    }
    if (nParameters !== nRebuilt) {
        throw new Error('Verification failed - Node Response has different number of parameters');
    }
}