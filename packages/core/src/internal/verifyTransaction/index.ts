/** @ignore */
/** @internal */

import {rebuildTransactionPostData} from './rebuildTransactionPostData';

// Type 0 (payment): OK
// Type 1 (messaging): Missing 'sellAlias', 'buyAlias' (issue)
const methodsToVerify = [
    'sendMoney', 'sendMoneyMulti', 'sendMoneyMultiSame',
    'setAlias', 'setAccountInfo'
];

/**
 * @param method Signum API name
 * @param parameters object
 * @param response an HttpResponse
 * @throws Error on failure
 */
export function verifyTransaction(method: string, parameters: any, response: any) {
    if (response.broadcasted === true || response.transactionBytes) {
        // Transaction already signed, nothing to do
        return;
    }
    if (methodsToVerify.findIndex(item => item === method) === -1) {
        // Method not implemented yet
        return;
    }

    const rebuiltObject = rebuildTransactionPostData(response.unsignedTransactionBytes);

    if (method !== rebuiltObject.requestType) {
        throw new Error('Verification failed - Node Response does not match transaction parameters (A)');
    }
    let nParameters = 0;
    for (const prop in parameters) {
        if (String(parameters[prop]) !== String(rebuiltObject.rebuiltData[prop])) {
            throw new Error('Verification failed - Node Response does not match transaction parameters (B)');
        }
        nParameters++;
    }
    let nRebuilt = 0;
    for (const _prop in rebuiltObject.rebuiltData) {
        nRebuilt++;
    }
    if (nParameters !== nRebuilt) {
        throw new Error('Verification failed - Node Response does not match transaction parameters (C)');
    }
}
